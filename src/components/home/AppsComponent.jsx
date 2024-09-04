import AppsForm from "./applicationSearchEngine/SearchEngine";
import { useEffect, useState } from "react";
import { List, Spin, Button, Modal, Tabs } from "antd";
import {
     InfoCircleOutlined,
     CameraOutlined,
     CarOutlined,
} from "@ant-design/icons";

// Functions
import getDataQuery from "../../assets/composables/getDataQuery";

// Styles
import "../../assets/scss/home/AppsComponent.scss";

// Components
// import AppsRelated from "./applicationSearchEngine/ApplicationRelated";

export default function AppsComponent() {
     //  STATES
     const [dataApps, setDataApp] = useState([]);
     const [loadingDataTable, setLoadingDataTable] = useState(false);
     const [detailsModal, setDetailsModal] = useState({
          show: false,
          title: "",
          sku: null,
          producent: null,
     });

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
                                   sku: item[key],
                                   producent: key,
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
               <List.Item
                    key={index}
                    actions={[<Button key={index}>Szczegóły</Button>]}
                    onClick={() => handleClickDetails(item, index)}
               >
                    <List.Item.Meta
                         title={item.title}
                         description={item.description}
                    />
               </List.Item>
          );
     }

     function handleClickDetails(item) {
          setDetailsModal((prevDetailsModal) => {
               return {
                    ...prevDetailsModal,
                    title: item.title,
                    show: true,
                    sku: item.sku,
                    producent: item.producent,
               };
          });
     }

     console.log(detailsModal.sku);

     return (
          <>
               <AppsForm
                    style={{
                         margin: 10,
                         backgroundColor: "#FFF",
                    }}
                    submit={getDataToTable}
                    submitLoading={loadingDataTable}
               />

               <Modal
                    className="details-modal"
                    cancelText="Zamknij"
                    okText="Ok"
                    open={detailsModal.show}
                    title={detailsModal.title}
                    onCancel={() =>
                         setDetailsModal((prevDetailsModal) => {
                              return {
                                   ...prevDetailsModal,
                                   sku: null,
                                   show: false,
                              };
                         })
                    }
                    width={"80vw"}
                    style={{
                         height: "80vh",
                    }}
               >
                    <Tabs
                         defaultActiveKey={1}
                         tabBarStyle={{
                              width: "100%",
                              justifyContent: "center",
                         }}
                         items={[
                              {
                                   key: 0,
                                   label: "Specyfikacja",
                                   children: "Test",
                                   icon: <InfoCircleOutlined />,
                                   disabled: true,
                              },
                              {
                                   key: 1,
                                   label: "Powiązane aplikacje",
                                   children: (
                                        <AppsRelated
                                             sku={detailsModal.sku}
                                             producent={detailsModal.producent}
                                        />
                                   ),
                                   icon: <CarOutlined />,
                              },
                              {
                                   key: 2,
                                   label: "Zdjęcia",
                                   children: "Zdjęcia",
                                   icon: <CameraOutlined />,
                                   disabled: true,
                              },
                         ]}
                    />
               </Modal>

               <div style={{ marginTop: 10 }}>
                    <Spin spinning={loadingDataTable}>
                         <List
                              style={{
                                   backgroundColor: "#FFF",
                                   borderRadius: 10,
                                   padding: 20,
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
