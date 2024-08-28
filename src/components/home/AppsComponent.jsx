import AppsForm from "./AppsForm";
import { blue } from "@ant-design/colors";
import { useState } from "react";
import { List, Divider, Spin } from "antd";

import getDataQuery from "../../assets/composables/getDataQuery";

export default function AppsComponent() {
     //  STATES
     const [dataApps, setDataApp] = useState([]);
     const [loadingDataTable, setLoadingDataTable] = useState(false);

     //  DATA
     const mappingProducent = {
          sku_brembo: "Brembo",
          sku_ebc: "EBC",
          sku_dba: "DBA",
          sku_sdt: "SDT",
          sku_bd: "Black Diamond",
     };

     //  FUNCTIONS ASYNC
     async function getDataToTable(query) {
          setLoadingDataTable(true);

          const dataAppsDb = await getDataQuery(query);

          if (dataAppsDb) {
               let newDataAppsDb = [];

               dataAppsDb.forEach((item) => {
                    for (const key in item) {
                         if (item[key]) {
                              newDataAppsDb.push({
                                   title: item[key],
                                   description: `Producent: ${mappingProducent[key]}`,
                              });
                         }
                    }
               });

               setDataApp(newDataAppsDb);
          }
          setLoadingDataTable(false);
     }

     //  FUNCTIONS SYNC
     function renderItemList(item, index) {
          return (
               <List.Item key={index}>
                    <List.Item.Meta
                         title={item.title}
                         description={item.description}
                    />
               </List.Item>
          );
     }
     return (
          <>
               <AppsForm
                    style={{
                         margin: 10,
                    }}
                    submit={getDataToTable}
                    submitLoading={loadingDataTable}
               />

               <div style={{ marginTop: 10 }}>
                    <Spin spinning={loadingDataTable}>
                         <List
                              style={{
                                   backgroundColor: "#FFF",
                                   borderRadius: 10,
                                   padding: 10,
                              }}
                              dataSource={dataApps}
                              size="large"
                              renderItem={(item, index) =>
                                   renderItemList(item, index)
                              }
                              pagination={{
                                   pageSize: 5,
                              }}
                         />
                    </Spin>
               </div>
          </>
     );
}
