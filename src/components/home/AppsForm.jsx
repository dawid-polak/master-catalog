import { useState, useEffect, useRef } from "react";
import { Button, Select } from "antd";

import getDataQuery from "../../assets/composables/getDataQuery";

import "../../assets/scss/home/AppsForm.scss";

export default function AppsForm() {
     // STATES
     const [dataForm, setDataForm] = useState({
          brand: null,
          model: null,
          application: null,
     });
     const [dataOptionsForm, setDataOptionsForm] = useState({
          brands: null,
          models: undefined,
          applications: null,
     });
     const [errors, setErrors] = useState([]);
     const [disabled, setDisabled] = useState([]);
     const [loadingDataFormOptions, setLoadingDataFormOptions] = useState([]);

     //  PREVIOUSES
     const prevDataFormState = useRef({
          brand: null,
          model: null,
          application: null,
     });

     //  DATA
     const sqlQueries = {
          brand: "SELECT DISTINCT Brand FROM CROSS_DRZEWKO",
          model: `SELECT DISTINCT Model FROM CROSS_DRZEWKO WHERE Brand = '${dataForm.brand}'`,
          application: `SELECT DISTINCT TD_Engine FROM CROSS_DRZEWKO WHERE Brand = '${
               dataForm.brand
          }'${dataForm.model ? " AND Model = " + `'${dataForm.model}'` : ""}`,
     };
     const mappingData = {
          brand: "brands",
          model: "models",
          application: "applications",
     };
     const mappingDataDb = {
          brand: "Brand",
          model: "Model",
          application: "TD_Engine",
     };

     //  FUNCTIONS ASYNC
     async function getOptionsToSelect(id) {
          setLoadingDataFormOptions([id]);

          const options = await getDataQuery(sqlQueries[id]);

          setLoadingDataFormOptions([]);

          if (
               options &&
               options[0][mappingDataDb[id]] === "" &&
               options.length === 1
          ) {
               setDataOptionsForm((prevSetDataOptionsForm) => {
                    return {
                         ...prevSetDataOptionsForm,
                         [mappingData[id]]: null,
                    };
               });

               if (id === "model") {
                    setDisabled((prevDisabled) => {
                         return [
                              ...prevDisabled.map(
                                   (item) => item !== "application"
                              ),
                         ];
                    });
               }
          }

          let newOptions = [];

          options.forEach((item) => {
               if (item[mappingDataDb[id]] !== "") {
                    newOptions.push({
                         label: item[mappingDataDb[id]],
                         value: item[mappingDataDb[id]],
                    });
               }
          });

          if (newOptions.length === 0) return;

          setDataOptionsForm((prevDataOptionsForm) => {
               return {
                    ...prevDataOptionsForm,
                    [mappingData[id]]: newOptions,
               };
          });
     }

     //  FUNCTIONS SYNC
     function filterSort(optionA, optionB) {
          return (optionA?.label ?? "")
               .toLowerCase()
               .localeCompare((optionB?.label ?? "").toLowerCase());
     }

     function handleSetAppsForm(value, id) {
          //   Add value to prevDataFrom
          prevDataFormState.current[id] = dataForm[id];

          setDataForm((prevDataForm) => {
               return {
                    ...prevDataForm,
                    [id]: value,
               };
          });
     }

     function clearDataForm() {
          setDataForm({
               brand: null,
               model: null,
               application: null,
          });
     }

     //  USE EFFECTS
     useEffect(() => {
          // Disable enable model
          if (dataForm.brand === null || dataForm.brand === "") {
               setDisabled((prevDisabled) => {
                    return [...prevDisabled, "model"];
               });
          } else {
               setDisabled((prevDisabled) => {
                    return [...prevDisabled.map((item) => item !== "model")];
               });
          }

          // Disable enable appliaction
          if (dataForm.model === null || dataForm.model === "") {
               setDisabled((prevDisabled) => {
                    return [...prevDisabled, "application"];
               });
          } else {
               setDisabled((prevDisabled) => {
                    return [
                         ...prevDisabled.map((item) => item !== "application"),
                    ];
               });
          }

          //   Clear model and application
          if (
               prevDataFormState.current.brand !== null &&
               prevDataFormState.current.brand !== dataForm.brand
          ) {
               setDataForm((prevDataForm) => {
                    return {
                         ...prevDataForm,
                         model: null,
                         application: null,
                    };
               });
          }
     }, [dataForm.brand]);

     useEffect(() => {
          // Disable enable appliaction
          if (dataForm.model === null || dataForm.model === "") {
               setDisabled((prevDisabled) => {
                    return [...prevDisabled, "application"];
               });
          } else {
               setDisabled((prevDisabled) => {
                    return [
                         ...prevDisabled.map((item) => item !== "application"),
                    ];
               });
          }

          //   Clear application
          if (prevDataFormState.current.model !== dataForm.model) {
               setDataForm((prevDataForm) => {
                    return {
                         ...prevDataForm,
                         application: null,
                    };
               });
          }
     }, [dataForm.model]);

     return (
          <>
               <form className="apps-form">
                    <div className="first-row">
                         <Select
                              name="brand"
                              showSearch
                              value={dataForm.brand}
                              options={dataOptionsForm.brands}
                              loading={loadingDataFormOptions.includes("brand")}
                              status={errors.includes("brand") ? "error" : null}
                              placeholder="Marka"
                              className="control"
                              optionFilterProp="label"
                              onChange={(e) => handleSetAppsForm(e, "brand")}
                              onFocus={() => getOptionsToSelect("brand")}
                              filterSort={(a, b) => filterSort(a, b)}
                         />
                         <Select
                              name="model"
                              showSearch
                              value={dataForm.model}
                              options={dataOptionsForm.models}
                              loading={loadingDataFormOptions.includes("model")}
                              status={errors.includes("model") ? "error" : null}
                              disabled={disabled.includes("model")}
                              placeholder="Model"
                              className="control"
                              optionFilterProp="label"
                              onChange={(e) => handleSetAppsForm(e, "model")}
                              onFocus={() => getOptionsToSelect("model")}
                              filterSort={(a, b) => filterSort(a, b)}
                         />
                    </div>

                    <Select
                         name="application"
                         showSearch
                         value={dataForm.application}
                         options={dataOptionsForm.applications}
                         loading={loadingDataFormOptions.includes(
                              "application"
                         )}
                         status={
                              errors.includes("application") ? "error" : null
                         }
                         disabled={disabled.includes("application")}
                         placeholder="Aplikacja"
                         className="control"
                         optionFilterProp="label"
                         onChange={(e) => handleSetAppsForm(e, "application")}
                         onFocus={() => getOptionsToSelect("application")}
                         filterSort={(a, b) => filterSort(a, b)}
                    />

                    <div className="btns">
                         <Button type="primary" htmlType="submit">
                              Szukaj
                         </Button>
                         <Button
                              type="outlined"
                              size="small"
                              onClick={clearDataForm}
                         >
                              Resetuj
                         </Button>
                    </div>
               </form>
          </>
     );
}
