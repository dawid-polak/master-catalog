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

                         if (!res.data) return;

                         res.data.forEach((item) => {

                              if (selectedProducents.includes(item.source)) {
                                   newItems.push({
                                        id: item.sku,
                                        title: item.sku,
                                        description: item.source,
                                        content: item.criteria,
                                        id_producent: item.source,
                                   });
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
          let headers = data.map((item, index) => (
               <div
                    style={{
                         display: "flex",
                         alignItems: "center",
                    }}
                    key={index}
               >
                    <h5 style={{ margin: 0, padding: 0 }}>
                         {item.name_criteria}:
                    </h5>

                    <h5
                         style={{
                              fontWeight: 300,
                              margin: "0px 5px",
                              padding: 0,
                         }}
                    >
                         {item.value_criteria.map((item) => item + " ")}
                    </h5>
               </div>
          ));

          return (
               <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "25%" }}></div>
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
                              >
                                   <List.Item.Meta
                                        title={
                                             <div style={{ width: "300px" }}>
                                                  {item.title}
                                             </div>
                                        }
                                        description={
                                             <div style={{ width: "300px" }}>
                                                  {item.description}
                                             </div>
                                        }
                                   />

                                   {htmlContentItem(item.content)}
                              </List.Item>
                         )}
                    />

                    <Divider className="divider" />
               </div>
          </div>
     );
}
