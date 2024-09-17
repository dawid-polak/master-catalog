import { List, Divider, Input } from "antd";
import { useEffect, useState } from "react";

import DownloadFile from "../DownloadFile";

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
     const [res, setRes] = useState([]);

     function handleClickitem(id, item) {
          clickItem(id, item);

          setSelectedItem(item.id);
     }

     useEffect(() => {
          async function getItems() {
               if (query) {
                    const res = await getDataQuery(query);

                    console.log(res)

                    if (!res) return;

                    let newItems = [];

                    setLoading(false);

                    // GET SKU
                    if (id === "sku") {
                         res.forEach((item) => {
                              for (const key in item) {
                                   if (item.sku) {
                                        if (
                                             !newItems.find(
                                                  (newItem) =>
                                                       newItem.id === item.sku
                                             )
                                        ) {
                                             newItems.push({
                                                  id: item.sku,
                                                  title: item.sku,
                                                  description:
                                                       "Producent: " +
                                                       mappingData.producents[
                                                            item.source
                                                       ],
                                                  id_producent: item.source,
                                             });
                                        }
                                   }
                              }
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
     }, [query, id]);

     return (
          <div style={{ height: "100%" }}>
               <div className="column-container">
                    <div className="title">
                         <h3>{title}</h3>
                         <DownloadFile data={res} size={"small"} />
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

               {/* <Divider orientation="right" type="vertical" style={{backgroundColor: 'red', height: '100%'}}/> */}
          </div>
     );
}
