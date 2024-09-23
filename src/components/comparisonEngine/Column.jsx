import { List, Divider, Modal, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import DownloadFile from "../DownloadFile";
import ComparisonEngineFilters from "./Filters";

import getDataQuery from "../../assets/composables/getDataQuery";
import mappingData from "../../assets/composables/comparisonEngine/mappingData";

import "../../assets/scss/comparisonEngine/Column.scss";

export default function ComparisonEngineColumn({
     id,
     clickItem,
     title,
     query,
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
               if (query && !isModalOpen) {
                    setLoading(true);

                    const res =
                         $res.length > 0 ? $res : await getDataQuery(query);

                    if (!res) return;

                    let newItems = [];

                    setLoading(false);

                    // GET SKU
                    if (id === "sku") {
                         let selectedProducents = JSON.parse(
                              localStorage.getItem("filtersShowProducents")
                         );

                         // dadać poprawkę - pierwsze logowanie bez cookies - nie ładują sie itemy
                         // usunać cancel z modelu

                         res.forEach((item) => {
                              for (const key in item) {
                                   if (item.sku) {
                                        if (
                                             !newItems.find(
                                                  (newItem) =>
                                                       newItem.id === item.sku
                                             ) &&
                                             selectedProducents.includes(
                                                  item.source
                                             )
                                        ) {
                                             newItems.push({
                                                  id: item.sku,
                                                  title: item.sku,
                                                  description:
                                                       mappingData.producents[
                                                            item.source
                                                       ],
                                                  id_producent: item.source,
                                             });
                                        }
                                   }
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
     }, [query, id, isModalOpen]);

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
                                   label={item.title}
                              >
                                   <List.Item.Meta
                                        title={item.title}
                                        description={item.description}
                                   />
                              </List.Item>
                         )}
                    />

                    <Divider className="divider" />

                    <div className="footer">
                         {/* <Search
                              placeholder={"Wyszukaj " + id}
                              allowClear
                              className="search"
                         /> */}
                    </div>
               </div>
          </div>
     );
}
