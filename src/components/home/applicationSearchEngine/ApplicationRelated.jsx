import { useEffect, useState } from "react";
import { Spin, List, theme } from "antd";
import ResultsList from "./ResultsList";

import getDataQuery from "../../../assets/composables/getDataQuery";
import databaseDataMapping from "../../../assets/composables/databaseDataMapping";

export default function ApplicationRelated({ data, expanded, showTop }) {
     const [loading, setLoading] = useState(false);
     const [items, setItems] = useState([]);

     // Data
     const sqlQueies = {
          brand: `SELECT DISTINCT Brand FROM CROSS_ALL_DATA WHERE ${data.id_producent} = '${data.sku}'`,
          engines: `SELECT DISTINCT TD_Engine FROM CROSS_ALL_DATA WHERE ${data.id_producent} = '${data.sku}' AND Brand = '${data.brand}'`,
          skus: `SELECT DISTINCT sku_sdt, sku_dba, sku_bd, sku_ebc, sku_brembo FROM CROSS_ALL_DATA WHERE ${data.id_producent} = '${data.sku}' AND Brand = '${data.brand}' AND TD_Engine = '${data.engine}'`,
     };

     function selectQuery() {
          if (!data.brand) {
               return sqlQueies.brand;
          }

          if (!data.engine) {
               return sqlQueies.engines;
          }

          return sqlQueies.skus;
     }

     function selectKeyResult() {
          if (!data.brand) {
               return "Brand";
          }

          if (!data.engine) {
               return "TD_Engine";
          }

          return "sku_bd";
     }

     useEffect(() => {
          const handleGetData = async () => {
               if (data.sku) {
                    setLoading(true);

                    const res = await getDataQuery(selectQuery());

                    if (data.engine) {
                         let modifiedData = [];

                         res.forEach((item) => {
                              for (const key in item) {
                                   if (item[key]) {
                                        modifiedData.push({
                                             title: item[key],
                                             description:
                                                  databaseDataMapping[key],
                                        });
                                   }
                              }
                         });

                         setItems(modifiedData);
                    } else {
                         setItems(
                              res.map((item) => ({
                                   title: item[selectKeyResult()],
                              }))
                         );
                    }

                    setLoading(false);
               }
          };

          handleGetData();
     }, [data.sku]);

     return (
          <>
               <ResultsList
                    data={data}
                    loading={loading}
                    items={items}
                    expanded={expanded}
                    itemLayout={expanded ? "vertical" : "horizontal"}
                    showTop={showTop}
               />
          </>
     );
}
