import { useRef, useState, useEffect } from "react";
import { Button, Form, Select } from "antd";

import getDataQuery from "../../assets/composables/getDataQuery";
import createSqlQueryToOptions from "../../assets/composables/comparisonEngine/createSqlQueryToOptions";
import mappingData from "../../assets/composables/comparisonEngine/mappingData";
import dateFormatting from "../../assets/composables/comparisonEngine/dateFormatting";

export default function ComparisonEngineForm({
     setDataForm,
     dataForm,
     clickSubmit,
}) {
     const [dataOptions, setDataOptions] = useState({
          brandOptions: null,
          modelOptions: null,
          engineOptions: null,
          yearsOfProductionsOptions: null,
          powerOptions: null,
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
                    <Form.Item name="engine">
                         <Select
                              showSearch
                              placeholder="Silnik"
                              allowClear
                              loading={loading}
                              filterSort={(a, b) => filterSort(a, b)}
                              options={dataOptions.engineOptions}
                              onFocus={() => getOptions("engineOptions")}
                              onChange={(e) => handleSetNewValue("engine", e)}
                         />
                    </Form.Item>

                    <div style={{ display: "flex", width: "100%" }}>
                         <Form.Item
                              name="yearsOfProductions"
                              style={{ flex: 1, marginRight: 10 }}
                         >
                              <Select
                                   showSearch
                                   placeholder="Lata produkcji"
                                   allowClear
                                   loading={loading}
                                   options={
                                        dataOptions.yearsOfProductionsOptions
                                   }
                                   onFocus={() =>
                                        getOptions("yearsOfProductionsOptions")
                                   }
                                   onChange={(e) =>
                                        handleSetNewValue(
                                             "yearsOfProductions",
                                             e
                                        )
                                   }
                              />
                         </Form.Item>

                         <Form.Item name="power" style={{ flex: 1 }}>
                              <Select
                                   showSearch
                                   placeholder="Liczba KM"
                                   allowClear
                                   loading={loading}
                                   options={dataOptions.powerOptions}
                                   onFocus={() => getOptions("powerOptions")}
                                   onChange={(e) =>
                                        handleSetNewValue("power", e)
                                   }
                              />
                         </Form.Item>
                    </div>

                    <Form.Item>
                         <Button
                              ref={submitRef}
                              type="primary"
                              htmlType="submit"
                         >
                              Szukaj
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
}
