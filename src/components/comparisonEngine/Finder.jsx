import { useState, useEffect } from "react";

import "../../assets/scss/comparisonEngine/Finder.scss";

import ComparisonEngineColumn from "./Column";

export default function ComparisonEngineFinder({ query, dataForm }) {
     const [columns, setColumns] = useState([]);

     const sequence = ["sku", "brand", "model", "engine"];
     const mappingTitle = {
          sku: "SKU",
          brand: "Marka",
          model: "Model",
          engine: "Silnik",
     };
     const [selectedItemColumns, setSelectedItemColumns] = useState({
          sku: null,
          brand: null,
          model: null,
     });

     const addColumn = (id, title, query) => {
          setColumns((prevColumns) => {
               return [
                    ...prevColumns,
                    {
                         key: Math.random(9),
                         id: id,
                         title: title,
                         query: query,
                    },
               ];
          });
     };

     const createQuery = (id, item) => {
          let createdQuery;

          if (id === "sku") {
               createdQuery = `SELECT * FROM CROSS_SKU_KTYPE_V2 WHERE ktype IN ('120608' , '59244' , '121603' , '106381');
`;
               return createQuery;
          }

          if (id === "brand") {
               createdQuery = `SELECT DISTINCT Brand FROM CROSS_ALL_DATA_NEW WHERE ${item.id_producent} = '${item.id}'`;

               return createdQuery;
          }

          if (id === "model") {
               createdQuery = `SELECT DISTINCT TD_Model FROM CROSS_ALL_DATA_NEW WHERE Brand = '${item.id}' AND ${selectedItemColumns.sku.id_producent} = '${selectedItemColumns.sku.id}'`;

               return createdQuery;
          }

          if (id === "engine") {
               createdQuery = `SELECT DISTINCT TD_Engine FROM CROSS_ALL_DATA_NEW WHERE TD_Model = '${item.id}' AND ${selectedItemColumns.sku.id_producent} = '${selectedItemColumns.sku.id}' AND Brand = '${selectedItemColumns.brand.id}'`;

               return createdQuery;
          }

          return null;
     };

     const removeNestedColumns = (index) => {
          setColumns((prevColumns) =>
               prevColumns.slice(0, index || prevColumns.length)
          );
     };

     const handleClickItem = (id, item) => {
          if (["engine"].includes(id)) return;

          let sequenceINDEX = sequence.indexOf(
               sequence.find((item) => item === id)
          );

          let idNestedColumn = sequence[sequenceINDEX + 1];

          let titleNestedColumn = mappingTitle[idNestedColumn];

          if (
               columns.find((item) => item.id === idNestedColumn) &&
               columns.length > 1
          ) {
               removeNestedColumns(sequenceINDEX + 1);

               addColumn(
                    idNestedColumn,
                    titleNestedColumn,
                    createQuery(idNestedColumn, item)
               );
          } else {
               addColumn(
                    idNestedColumn,
                    titleNestedColumn,
                    createQuery(idNestedColumn, item)
               );
          }

          setSelectedItemColumns((prevSelctedItemColumns) => {
               return {
                    ...prevSelctedItemColumns,
                    [id]: item,
               };
          });
     };

     const htmlColumns = columns.map((item) => {
          return (
               <div className="column" key={item.key}>
                    <ComparisonEngineColumn
                         id={item.id}
                         title={item.title}
                         isNested={item.isNested}
                         query={item.query}
                         clickItem={handleClickItem}
                    />
               </div>
          );
     });

     useEffect(() => {
          setColumns([
               {
                    key: 1,
                    id: "sku",
                    title: "SKU",
                    query: query,
               },
          ]);
     }, [query]);

     return (
          <div className="container-finder">
               <div className="top">
                    <p>
                         {(dataForm.brand ? dataForm.brand : "") +
                              (dataForm.model ? " -- " + dataForm.model : "") +
                              (dataForm.engine ? " -- " + dataForm.engine : "")}
                    </p>
               </div>
               <div className="content">{query && htmlColumns}</div>
          </div>
     );
}
