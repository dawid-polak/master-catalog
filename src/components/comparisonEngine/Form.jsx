import { useRef, useState, useEffect } from "react";
import { Button, Form, Select, message } from "antd";

import getDataQuery from "../../assets/composables/getDataQuery";
import createSqlQueryToOptions from "../../assets/composables/comparisonEngine/createSqlQueryToOptions";
import mappingData from "../../assets/composables/comparisonEngine/mappingData";
import dateFormatting from "../../assets/composables/comparisonEngine/dateFormatting";
import createLabelToEngineYearsPowerOptions from "../../assets/composables/comparisonEngine/createLabelToEngineYearsPowerOptions";

import "../../assets/scss/comparisonEngine/Form.scss";

export default function ComparisonEngineForm({
     setDataForm,
     dataForm,
     clickSubmit,
}) {
     const [messageApi, contextHolder] = message.useMessage();
     const [dataOptions, setDataOptions] = useState({
          brandOptions: null,
          modelOptions: null,
          engineOptions: null,
          yearsOfProductionsOptions: null,
          powerOptions: null,
          engineYearsOfProductionsPowerOptions: null,
     });
     const [loading, setLoading] = useState(false);

     const submitRef = useRef(null);
     const [form] = Form.useForm();

     const rules = {
          required: {
               required: false,
               message: "Uzupełnij te pole",
          },
     };

     // Function to get options from server to selects
     async function getOptions(id) {
          if (!dataForm.brand && id !== "brandOptions") {
               submitRef.current.click();

               return;
          }

          const query = createSqlQueryToOptions(dataForm, id);

          const data = await getDataQuery(query);

          let options = [];

          if (data) {
               for (const item of data) {
                    // assign options to yers of productions
                    if (id === "yearsOfProductionsOptions") {
                         let dates = mappingData.formOptions[id].map(
                              (el) => `${item[el]}`
                         );

                         let date = dates[0] + dates[1];

                         let formatedLabel = dateFormatting(date);

                         options.push({
                              label: formatedLabel,
                              value: date,
                         });

                         continue;
                    }

                    // assign options to power
                    if (id === "powerOptions") {
                         options.push({
                              label: item[mappingData.formOptions[id]] + " KM",
                              value: item[mappingData.formOptions[id]],
                         });

                         continue;
                    }

                    // assign options to engineYearsOfProductionsPower
                    if (id === "engineYearsOfProductionsPowerOptions") {
                         if (
                              !item.TD_Engine ||
                              (!item.TD_Engine_From && !item.TD_Engine_TO) ||
                              (!item.KM && !item.kW)
                         )
                              return;

                         let value = `${item.kW};${
                              item.TD_Engine_From ? item.TD_Engine_From : null
                         };${item.TD_Engine_TO ? item.TD_Engine_TO : null};${
                              item.KM
                         };${item.TD_Engine}`;

                         let valueIsExist = options.find(
                              (item) => item.value === value
                         );

                         let label =
                              createLabelToEngineYearsPowerOptions(value);

                         if (!valueIsExist) {
                              options.push({
                                   label,
                                   value,
                              });
                         }

                         continue;
                    }

                    // assign unalienable options
                    options.push({
                         label: item[mappingData.formOptions[id]],
                         value: item[mappingData.formOptions[id]],
                    });
               }

               setDataOptions((prevDataOptions) => {
                    return {
                         ...prevDataOptions,
                         [id]: options,
                    };
               });
          }
     }

     // Function to sort options in selects
     function filterSort(optionA, optionB) {
          return (optionA?.label ?? "")
               .toLowerCase()
               .localeCompare((optionB?.label ?? "").toLowerCase());
     }

     function handleSetNewValue(id, updatedValue) {
          let fieldsByHierarchy = [
               "brand",
               "model",
               "engineYearsOfProductionsPower",
               "engine",
               "yearsOfProductions",
               "power",
          ];

          let fieldCurrentIndex = fieldsByHierarchy.indexOf(id);
          let fieldsToReset = fieldsByHierarchy.filter(function (item, index) {
               return fieldCurrentIndex < index;
          });

          setDataForm(id, updatedValue, fieldsToReset);
          return;
     }

     // Function to copy link
     function handleCopyLink() {
          let url = window.location.href;

          navigator.clipboard.writeText(url).then(() => {
               messageApi.open({
                    type: "success",
                    content: "Skopiowano link do schowka",
               });
          });
     }

     useEffect(() => {
          let formatedDataForm = {};

          for (const key in dataForm) {
               if (!dataForm[key]) {
                    formatedDataForm[key] = null;

                    continue;
               }

               if (key === "power") {
                    formatedDataForm[key] = {
                         label: dataForm[key] + " KM",
                         value: dataForm[key],
                    };

                    continue;
               }

               if (key === "yearsOfProductions") {
                    formatedDataForm[key] = {
                         label: dateFormatting(dataForm[key]),
                         value: dataForm[key],
                    };

                    continue;
               }

               if (key === "engineYearsOfProductionsPower") {
                    formatedDataForm[key] = {
                         label: createLabelToEngineYearsPowerOptions(
                              dataForm[key]
                         ),
                         value: dataForm[key],
                    };

                    continue;
               }

               formatedDataForm[key] = dataForm[key];
          }

          form.setFieldsValue(formatedDataForm);
     }, [dataForm]);

     return (
          <div>
               <Form
                    form={form}
                    initialValues={dataForm}
                    onFinish={() => clickSubmit()}
               >
                    <Form.Item rules={[rules.required]} name="brand">
                         <Select
                              showSearch
                              placeholder="Marka"
                              allowClear
                              loading={loading}
                              filterSort={(a, b) => filterSort(a, b)}
                              options={dataOptions.brandOptions}
                              onFocus={() => getOptions("brandOptions")}
                              onChange={(e) => handleSetNewValue("brand", e)}
                         />
                    </Form.Item>
                    <Form.Item rules={[rules.required]} name="model">
                         <Select
                              showSearch
                              placeholder="Model"
                              allowClear
                              loading={loading}
                              filterSort={(a, b) => filterSort(a, b)}
                              options={dataOptions.modelOptions}
                              onFocus={() => getOptions("modelOptions")}
                              onChange={(e) => handleSetNewValue("model", e)}
                         />
                    </Form.Item>

                    <Form.Item name="engineYearsOfProductionsPower">
                         <Select
                              showSearch
                              placeholder="Silnik | Moc kW | Moc KM | Lata produkcji "
                              allowClear
                              loading={loading}
                              filterSort={(a, b) => filterSort(a, b)}
                              options={
                                   dataOptions.engineYearsOfProductionsPowerOptions
                              }
                              onFocus={() =>
                                   getOptions(
                                        "engineYearsOfProductionsPowerOptions"
                                   )
                              }
                              onChange={(e) =>
                                   handleSetNewValue(
                                        "engineYearsOfProductionsPower",
                                        e
                                   )
                              }
                         />
                    </Form.Item>

                    <Form.Item>
                         <div className="btns">
                              <Button
                                   ref={submitRef}
                                   type="primary"
                                   htmlType="submit"
                              >
                                   Szukaj
                              </Button>

                              {contextHolder}

                              <Button type="link" onClick={handleCopyLink}>
                                   Kopuj link
                              </Button>
                         </div>
                    </Form.Item>
               </Form>
          </div>
     );
}
