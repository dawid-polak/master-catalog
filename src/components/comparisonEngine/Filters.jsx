import { useEffect, useState } from "react";
import { Checkbox } from "antd";

import mappingData from "../../assets/composables/comparisonEngine/mappingData";

import "../../assets/scss/comparisonEngine/Filters.scss";

export default function ComparisonEngineFilters({ data, id }) {
     // DATA
     let [activeFiltersShowProducents, setActiveFiltersShowProducents] =
          useState(() => {
               return JSON.parse(localStorage.getItem("filtersShowProducents"));
          });

     //  FUNCTIONS
     //  Update localstorage activeFiltersShowProducents
     const handleUpdateActiveFiltersShowProducents = (
          isActive,
          idProducent
     ) => {
          // I do not allow every value to be false
          if (activeFiltersShowProducents.length === 1 && !isActive) return;

          let newActiveFiltersShowProducents = activeFiltersShowProducents.map(
               (item) => item
          );

          let isExist = activeFiltersShowProducents.find(
               (item) => item === idProducent
          );

          if (!isExist && isActive) {
               newActiveFiltersShowProducents.push(idProducent);
          }

          if (isExist && !isActive) {
               newActiveFiltersShowProducents =
                    newActiveFiltersShowProducents.filter(
                         (item) => item !== idProducent
                    );
          }

          if (newActiveFiltersShowProducents) {
               localStorage.setItem(
                    "filtersShowProducents",
                    JSON.stringify(newActiveFiltersShowProducents)
               );

               setActiveFiltersShowProducents(newActiveFiltersShowProducents);

               return;
          }
     };

     // HTML
     //  Render HTML checkboxes to select producents
     const checkboxes = mappingData.producents_array.map((item, index) => {
          let isActive = false;

          if (activeFiltersShowProducents) {
               isActive = activeFiltersShowProducents.includes(item);
          }

          return (
               <Checkbox
                    key={index}
                    checked={isActive}
                    onChange={(e) =>
                         handleUpdateActiveFiltersShowProducents(
                              e.target.checked,
                              item
                         )
                    }
               >
                    {item}
               </Checkbox>
          );
     });

     useEffect(() => {
          // Create localStorage to mangement show custom producents
          if (
               !activeFiltersShowProducents ||
               activeFiltersShowProducents.length === 0
          ) {
               localStorage.setItem(
                    "filtersShowProducents",
                    JSON.stringify(mappingData.producents_array)
               );

               setActiveFiltersShowProducents(
                    JSON.parse(localStorage.getItem("filtersShowProducents"))
               );
          }
     }, [activeFiltersShowProducents]);

     return (
          <div className="filters">
               <div className="sku">
                    <p className="title">Wybierz producentów:</p>
                    <div className="form">{checkboxes}</div>
               </div>
          </div>
     );
}
