import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import ComparisonEngineForm from "../components/comparisonEngine/Form";
import ComparisonEngineFinder from "../components/comparisonEngine/Finder";

import "../assets/scss/comparisonEngine/ComparisonEngine.scss";

export default function ComparisonEngine() {
     const [searchParams, setSearchParams] = useSearchParams();
     const [dataForm, setDataForm] = useState({
          brand: null,
          model: null,
          engine: null,
     });
     const [sqlQuery, setSqlQuery] = useState(null);

     const handleSetDataForm = (id, updatedValue) => {
          if (id === "brand") {
               console.log("ds");
               setDataForm(() => {
                    return {
                         model: null,
                         engine: null,
                         [id]: updatedValue,
                    };
               });
          } else {
               setDataForm((prevSetDataForm) => {
                    return {
                         ...prevSetDataForm,
                         [id]: updatedValue,
                    };
               });
          }
     };

     useEffect(() => {
          let query = {};

          for (const key in dataForm) {
               if (dataForm[key]) {
                    query = { ...query, [key]: dataForm[key] };
               }
          }

          setSearchParams(query);
     }, [dataForm]);

     const setDataFormFromQueries = () => {
          if (searchParams.size > 0) {
               if (dataForm.brand || dataForm.model || dataForm.engine) return;

               let dataFromQuery = {
                    brand: searchParams.get("brand"),
                    model: searchParams.get("model"),
                    engine: searchParams.get("engine"),
               };

               setDataForm(dataFromQuery);
          }
     };

     setDataFormFromQueries();

     function handleClickSubmit() {
          setSqlQuery(null);
          const mappingDataDb = {
               brand: "Brand",
               model: "TD_Model",
               engine: "TD_Engine",
          };

          let query =
               "SELECT DISTINCT sku_sdt, sku_dba, sku_bd, sku_ebc, sku_brembo FROM CROSS_ALL_DATA_NEW WHERE ";

          for (const key in dataForm) {
               if (dataForm[key]) {
                    query =
                         query +
                         `${mappingDataDb[key]} = '${dataForm[key]}' AND `;
               }
          }

          query = query.slice(0, -4);

          if (dataForm.brand) {
               setSqlQuery(query);

               return;
          }
          return;
     }

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
                         setDataForm={(key, updatedValue) =>
                              handleSetDataForm(key, updatedValue)
                         }
                         clickSubmit={handleClickSubmit}
                         dataForm={dataForm}
                    />
               </div>

               <div className="finder">
                    <ComparisonEngineFinder
                         query={sqlQuery}
                         dataForm={dataForm}
                    />
               </div>
          </div>
     );
}
