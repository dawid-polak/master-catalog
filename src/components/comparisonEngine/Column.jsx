import { List, Divider, Input } from "antd";
import { useEffect, useState } from "react";

import getDataQuery from "../../assets/composables/getDataQuery";

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

     const { Search } = Input;

     //  const sqlQueies = {

     //   brand: `SELECT DISTINCT Brand FROM CROSS_ALL_DATA WHERE ${data.id_producent} = '${data.sku}'`,
     //      model:
     //   engines: `SELECT DISTINCT TD_Engine FROM CROSS_ALL_DATA WHERE ${data.id_producent} = '${data.sku}' AND Brand = '${data.brand}'`,
     //   skus: `SELECT DISTINCT sku_sdt, sku_dba, sku_bd, sku_ebc, sku_brembo FROM CROSS_ALL_DATA WHERE ${data.id_producent} = '${data.sku}' AND Brand = '${data.brand}' AND TD_Engine = '${data.engine}'`,
     //  };

     function handleClickitem(id, item) {
          clickItem(id, item);

          setSelectedItem(item.id);
     }

     useEffect(() => {
          async function getItems() {
               if (query) {
                    const res = await getDataQuery(query);

                    if (!res) return;

                    let newItems = [];

                    setLoading(false);

                    // GET SKU
                    if (id === "sku") {
                         res.forEach((item) => {
                              for (const key in item) {
                                   if (item[key]) {
                                        if (
                                             !newItems.find(
                                                  (newItem) =>
                                                       newItem.id === item[key]
                                             )
                                        ) {
                                             newItems.push({
                                                  id: item[key],
                                                  title: item[key],
                                                  description: key,
                                                  id_producent: key,
                                             });
                                        }
                                   }
                              }
                         });

                         setItems(newItems);

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
          <div style={{ height: "100%"}}>
               <div className="column-container">
                    <div className="title">
                         <h3>{title}</h3>
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
                                   onClick={() => handleClickitem(id, item)}
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
