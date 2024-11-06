import { List, Divider, Modal, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import DownloadFile from "../DownloadFile";
import ComparisonEngineFilters from "./Filters";

import mappingData from "../../assets/composables/comparisonEngine/mappingData";
import getCrossItems from "../../assets/composables/connections/cross";

import "../../assets/scss/comparisonEngine/Column.scss";

export default function ComparisonEngineColumn({
     id,
     clickItem,
     title,
     ktypes,
}) {
     const [loading, setLoading] = useState(true);
     const [items, setItems] = useState([]);
     const [selectedItem, setSelectedItem] = useState(null);
     const [$res, setRes] = useState([]);
     const [isModalOpen, setIsModalOpen] = useState(false);

     function handleClickitem(id, item) {
          clickItem(id, item);

          setSelectedItem(item.id);
     }

     async function handleModalOkClick() {
          setIsModalOpen(false);
     }

     // USE EFFECTS
     useEffect(() => {
          // Get Items
          async function getItems() {
               if (!isModalOpen) {
                    setLoading(true);

                    if (ktypes.length === 0) return;

                    const res =
                         $res.length > 0
                              ? $res
                              : await getCrossItems(
                                     ktypes.map((item) => item.ktype)
                                );

                    if (!res) return;

                    let newItems = [];

                    setLoading(false);

                    // GET SKUf
                    if (id === "sku") {
                         let selectedProducents = JSON.parse(
                              localStorage.getItem("filtersShowProducents")
                         );

                         // if there is no localStorage - filtersShowProducents, we return all producents by default
                         if (!selectedProducents) {
                              selectedProducents =
                                   mappingData.producents_array.map(
                                        (item) => item
                                   );
                         }

                         if (!res.data) {
                              setRes([])
                              setItems([])

                              return
                         }

                         res.data.forEach((item) => {
                              if (selectedProducents.includes(item.source)) {
                                   newItems.push({
                                        id: item.sku,
                                        title: item.sku,
                                        description: {
                                             oem: item.oem,
                                             source: item.source,
                                        },
                                        content: item.criteria,
                                        id_producent: item.source,
                                        skuMintex: Array.isArray(item.skuMintex) ? item.skuMintex.join(', ') : item.skuMintex
                                   });

                                   console.log(item)
                              }
                         });

                         // Sort newItems
                         newItems.sort((a, b) => {
                              let indexA = selectedProducents.indexOf(
                                   a.id_producent
                              );
                              let indexB = selectedProducents.indexOf(
                                   b.id_producent
                              );

                              return indexA - indexB;
                         });

                         setItems(newItems);
                         setRes(res);

                         return;
                    }

                    // GET BRAND
                    if (id === "brand") {
                         res.forEach((item) => {
                              newItems.push({
                                   id: item.Brand,
                                   title: item.Brand,
                                   description: null,
                              });
                         });

                         setItems(newItems);

                         return;
                    }

                    // GET MODEL
                    if (id === "model") {
                         res.forEach((item) => {
                              newItems.push({
                                   id: item.TD_Model,
                                   title: item.TD_Model,
                                   description: null,
                              });
                         });

                         setItems(newItems);

                         return;
                    }

                    // GET ENGINE
                    if (id === "engine") {
                         res.forEach((item) => {
                              newItems.push({
                                   id: item.TD_Engine,
                                   title: item.TD_Engine,
                                   description: null,
                              });
                         });

                         setItems(newItems);
                         return;
                    }
               }
          }

          getItems();
     }, [ktypes, id, isModalOpen]);

     // Render Content
     const htmlContentItem = (data) => {
          if (!data)
               return (
                    <div style={{ flex: 1, display: "flex" }}>
                         <div style={{ width: "75%" }}>
                              <h5
                                   style={{
                                        fontWeight: 300,
                                        margin: "0px 5px",
                                        padding: 0,
                                   }}
                              >
                                   No data
                              </h5>
                         </div>
                    </div>
               );

          let headers = Object.entries(data).map(([key, value], index) => (
               <div
                    style={{
                         display: "flex",
                         alignItems: "center",
                         width: "80%",
                    }}
                    key={index}
               >
                    <h5 style={{ margin: 0, padding: 0 }}>{key}:</h5>

                    <h5
                         style={{
                              fontWeight: 300,
                              margin: "0px 5px",
                              padding: 0,
                         }}
                    >
                         {Array.isArray(value) ? value.join(" ") : value}
                    </h5>
               </div>
          ));

          return (
               <div style={{ flex: 1, display: "flex" }}>
                    {/* <div style={{ width: "25%" }}></div> */}
                    <div style={{ width: "75%" }}>{headers}</div>
               </div>
          );
     };

     return (
          <div style={{ height: "100%" }}>
               <div className="column-container">
                    <div className="title">
                         <h3>{title}</h3>

                         <div className="btns">
                              <Modal
                                   title="Filtry"
                                   open={isModalOpen}
                                   onOk={() => handleModalOkClick()}
                                   cancelButtonProps={{
                                        style: {
                                             display: "none",
                                        },
                                   }}
                              >
                                   <ComparisonEngineFilters
                                        data={items}
                                        id={id}
                                   />
                              </Modal>

                              <Button
                                   type="primary"
                                   size="small"
                                   icon={<FilterOutlined />}
                                   onClick={() => setIsModalOpen(true)}
                              />
                              <DownloadFile data={$res} size={"small"} />
                         </div>
                    </div>
                    <Divider className="divider" />

                    <List
                         loading={loading}
                         className="list"
                         size="small"
                         height={673}
                         dataSource={items}
                         renderItem={(item) => (
                              <List.Item
                                   className="list-item"
                                   style={{
                                        backgroundColor:
                                             item.id === selectedItem
                                                  ? "#F5F5F5"
                                                  : "#FFF",
                                   }}
                                   // onClick={() => handleClickitem(id, item)}
                                   extra={htmlContentItem(item.content)}
                              >
                                   <List.Item.Meta
                                        title={item.title}
                                        description={
                                             <div style={{ width: "300px" }}>
                                                  <p
                                                       style={{
                                                            padding: 0,
                                                            margin: 0,
                                                       }}
                                                  >
                                                       {item.description.source}
                                                  </p>
                                                  <p
                                                       style={{
                                                            padding: 0,
                                                            margin: 0,
                                                            fontSize: "10px",
                                                            zIndex: 1000,
                                                       }}
                                                  >
                                                       {item.description.oem && 'OEM: '}
                                                       {item.description.oem} <br />
                                                       {item.skuMintex && 'Mintex SKU: ' + item.skuMintex}
                                                  </p>
                                             </div>
                                        }
                                   />

                                   {/* {htmlContentItem(item.content)} */}
                              </List.Item>
                         )}
                    />

                    <Divider className="divider" />
               </div>
          </div>
     );
}
