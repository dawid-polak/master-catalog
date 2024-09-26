import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ComparisonEngineForm from "../components/comparisonEngine/Form";
import ComparisonEngineFinder from "../components/comparisonEngine/Finder";

import getDataQuery from "../assets/composables/getDataQuery";
import mappingData from "../assets/composables/comparisonEngine/mappingData";

import "../assets/scss/comparisonEngine/ComparisonEngine.scss";

export default function ComparisonEngine() {
     const [searchParams, setSearchParams] = useSearchParams();
     const [dataForm, setDataForm] = useState({
          brand: null,
          model: null,
          engineYearsOfProductionsPower: null,
          engine: null,
          yearsOfProductions: null,
          power: null,
     });
     const [sqlQuery, setSqlQuery] = useState(null);
     const [ktypes, setKtypes] = useState([]);

     // Change data in dataForm
     const handleSetDataForm = (id, updatedValue, fieldsToReset) => {
          setDataForm((prevSetDataForm) => {
               let newDataForm = {
                    ...prevSetDataForm,
                    [id]: updatedValue,
               };

               fieldsToReset.forEach((item) => {
                    newDataForm[item] = null;
               });

               return newDataForm;
          });
     };

     // function to retrieve data from the hyperplane
     const setDataFormFromQueries = () => {
          if (searchParams.size > 0) {
               if (dataForm.brand || dataForm.model || dataForm.engine) return;

               let dataFromQuery = {
                    brand: searchParams.get("brand"),
                    model: searchParams.get("model"),
                    engine: searchParams.get("engine"),
                    engineYearsOfProductionsPower: searchParams.get(
                         "engineYearsOfProductionsPower"
                    ),
                    yearsOfProductions: searchParams.get("yearsOfProductions"),
                    power: searchParams.get("power"),
               };

               setDataForm(dataFromQuery);
          }
     };

     setDataFormFromQueries();

     async function handleClickSubmit() {
          setSqlQuery(null);

          // Create sql query to get ktypes from drzewko
          let query = "SELECT DISTINCT ktype FROM CROSS_DRZEWKO WHERE ";

          for (const key in dataForm) {
               if (!dataForm[key]) continue;

               if (key === "yearsOfProductions") {
                    let dateFrom = dataForm.yearsOfProductions.slice(0, 6);
                    let dateTo = dataForm.yearsOfProductions.slice(6, 12);

                    let dates = [dateFrom, dateTo];

                    mappingData.nameData[key].forEach((item, index) => {
                         query += `${item} = '${dates[index]}' AND `;
                    });

                    continue;
               }

               if (key === "engineYearsOfProductionsPower") {
                    let data = dataForm[key].split(";");
                    let keys = [
                         "kW",
                         "TD_Engine_From",
                         "TD_Engine_To",
                         "KM",
                         "TD_Engine",
                    ];
                    let arrayToCreateQuery = data.map((item, index) => {
                         return { value: item, key: keys[index] };
                    });

                    arrayToCreateQuery.forEach((item) => {
                         if (item.value !== "null") {
                              query += `${item.key} = '${item.value}' AND `;
                         }
                    });

                    continue;
               }

               query += `${mappingData.nameData[key]} = '${dataForm[key]}' AND `;

               continue;
          }

          query = query.slice(0, -4);

          // Get ktypes from drzewko
          const res = await getDataQuery(query);

          if (res && dataForm.brand) {
               let ktypes = "";

               ktypes += res.map((item) => " " + `'${item.ktype}'`);

               query = `SELECT * FROM CROSS_SKU_KTYPE_V4 WHERE ktype IN (${ktypes})`;

               setKtypes(res);

               return;
          }
          return;
     }

     // Use effect to run the code that will download the data
     useEffect(() => {
          const navigationType =
               performance.getEntriesByType("navigation")[0].type;

          if (
               ["reload", "navigate"].includes(navigationType) &&
               dataForm.brand
          ) {
               handleClickSubmit();
          }
     }, []);

     // Automatic creation of the query in the link
     useEffect(() => {
          let query = {};

          for (const key in dataForm) {
               if (dataForm[key]) {
                    query = { ...query, [key]: dataForm[key] };
               }
          }

          setSearchParams(query);
     }, [dataForm]);

     return (
          <div className="comparison-engine">
               <div className="form">
                    <div className="title">
                         <h2>Porównywarka</h2>
                         <p>
                              Umożliwiamy wyszukiwanie części do Twojego
                              samochodu i sprawdzanie ich kompatybilności z
                              innymi modelami
                         </p>
                    </div>
                    <ComparisonEngineForm
                         setDataForm={(key, updatedValue, fieldsToReset) =>
                              handleSetDataForm(
                                   key,
                                   updatedValue,
                                   fieldsToReset
                              )
                         }
                         clickSubmit={handleClickSubmit}
                         dataForm={dataForm}
                    />
               </div>

               <div className="finder">
                    <ComparisonEngineFinder
                         query={sqlQuery}
                         ktypes={ktypes}
                         dataForm={dataForm}
                    />
               </div>
          </div>
     );
}
