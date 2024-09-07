import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import ComparisonEngineForm from "../components/comparisonEngine/Form";

import "../assets/scss/comparisonEngine/ComparisonEngine.scss";

export default function ComparisonEngine() {
     const [searchParams, setSearchParams] = useSearchParams();
     const [dataForm, setDataForm] = useState({
          brand: null,
          model: null,
          engine: null,
     });

     const handleSetDataForm = (key, updatedValue) => {
          if (key === "brand") {
               setDataForm(() => {
                    return {
                         model: null,
                         engine: null,
                         [key]: updatedValue,
                    };
               });
          } else {
               setDataForm((prevSetDataForm) => {
                    return {
                         ...prevSetDataForm,
                         [key]: updatedValue,
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
     return (
          <div className="comparison-engine">
               <div className="form">
                    <ComparisonEngineForm
                         setDataForm={(key, updatedValue) =>
                              handleSetDataForm(key, updatedValue)
                         }
                         dataForm={dataForm}
                    />
               </div>
          </div>
     );
}
