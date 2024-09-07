import { useRef, useState } from "react";

import { Button, Checkbox, Form, Input, message, Select } from "antd";

import getDataQuery from "../../assets/composables/getDataQuery";

export default function ComparisonEngineForm({ setDataForm, dataForm }) {
     const [dataOptions, setDataOptions] = useState({
          brandOptions: null,
          modelOptions: null,
          engineOptions: null,
     });

     const submitRef = useRef(null);

     const rules = {
          required: {
               required: true,
               message: "Uzupełnij te pole",
          },
     };

     const mappingDataDb = {
          brandOptions: "Brand",
          modelOptions: "TD_Model",
          engineOptions: "TD_Engine",
     };

     const sqlQueries = {
          brandOptions: "SELECT DISTINCT Brand FROM CROSS_DRZEWKO",
          modelOptions: `SELECT DISTINCT TD_Model FROM CROSS_DRZEWKO WHERE Brand = '${dataForm.brand}'`,
          engineOptions: `SELECT DISTINCT TD_Engine FROM CROSS_DRZEWKO WHERE Brand = '${
               dataForm.brand
          }'${
               dataForm.model ? " AND TD_Model = " + `'${dataForm.model}'` : ""
          }`,
     };

     const initialValues = {
          brand: dataForm.brand,
          model: dataForm.model,
          engine: dataForm.engine,
     };

     async function getOptions(id) {
          if (!dataForm.brand && id !== "brandOptions") {
               submitRef.current.click();

               return;
          }

          const data = await getDataQuery(sqlQueries[id]);

          let options = [];

          if (data) {
               data.forEach((item) => {
                    options.push({
                         label: item[mappingDataDb[id]],
                         value: item[mappingDataDb[id]],
                    });
               });

               setDataOptions((prevDataOptions) => {
                    return {
                         ...prevDataOptions,
                         [id]: options,
                    };
               });
          }
     }

     function filterSort(optionA, optionB) {
          return (optionA?.label ?? "")
               .toLowerCase()
               .localeCompare((optionB?.label ?? "").toLowerCase());
     }

     return (
          <div>
               <Form initialValues={initialValues}>
                    <Form.Item rules={[rules.required]} name="brand">
                         <Select
                              showSearch
                              placeholder="Marka"
                              allowClear
                              filterSort={(a, b) => filterSort(a, b)}
                              options={dataOptions.brandOptions}
                              onFocus={() => getOptions("brandOptions")}
                              onChange={(e) => setDataForm("brand", e)}
                         />
                    </Form.Item>
                    <Form.Item name="model">
                         <Select
                              showSearch
                              placeholder="Model"
                              allowClear
                              filterSort={(a, b) => filterSort(a, b)}
                              options={dataOptions.modelOptions}
                              onFocus={() => getOptions("modelOptions")}
                              onChange={(e) => setDataForm("model", e)}
                         />
                    </Form.Item>
                    <Form.Item name="engine">
                         <Select
                              showSearch
                              placeholder="Silnik"
                              allowClear
                              filterSort={(a, b) => filterSort(a, b)}
                              options={dataOptions.engineOptions}
                              onFocus={() => getOptions("engineOptions")}
                              onChange={(e) => setDataForm("engine", e)}
                         />
                    </Form.Item>

                    <Form.Item>
                         <Button
                              ref={submitRef}
                              type="primary"
                              htmlType="submit"
                         >
                              Submit
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
}
