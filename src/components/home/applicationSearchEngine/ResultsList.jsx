import { List, Button } from "antd";
import DownloadFile from "../../DownloadFile";
<<<<<<< HEAD
import { DownOutlined } from "@ant-design/icons";
=======
>>>>>>> david

import "../../../assets/scss/home/ResultsList.scss";

import ApplicationRelated from "./ApplicationRelated";
import { useEffect, useState } from "react";

export default function ResultsList({
     data,
     items,
     loading,
     showDetails,
     expanded,
     itemLayout,
     showTop,
}) {
     const [expandedItem, setExpandedItem] = useState();

     // Function to render title
     function renderTitle(item) {
          if (expanded) {
               return <>{item.title}</>;
          }

          return item.title;
     }

     // Function to render actions
     function renderActions(item, index) {
          if (showDetails) {
               return (
                    <Button
                         key={index}
                         onClick={() => showDetails(item, index)}
                    >
                         Szczegóły
                    </Button>
               );
          }

          return null;
     }

     // Function to render descriptions
     function renderDescription(item) {
          if (showDetails) {
               return item.description;
          }
     }

     function createData(item, data) {
          if (!data.brand) {
               return { ...data, brand: item.title };
          }

          return {
               ...data,
               engine: item.title,
          };
     }

     // Function to render content
     function renderContent(item, index) {
          if (expanded && index === expandedItem) {
               return (
                    <div>
                         <ApplicationRelated
                              data={createData(item, data)}
                              expanded={data.brand ? false : true}
                              showTop={false}
                         />
                    </div>
               );
          }
     }

     // Function to render item in list
     function listItem(item, index) {
          return (
               <List.Item
                    key={index}
                    actions={[renderActions(item, index)]}
                    style={{ margin: 0 }}
               >
                    <List.Item.Meta
                         className={expanded ? "list-expanded" : null}
                         title={renderTitle(item)}
                         description={renderDescription(item)}
                         onClick={() => handleClickItem(item, index)}
                    />

                    {expanded && renderContent(item, index)}
               </List.Item>
          );
     }

     function handleClickItem(item, index) {
          if (expanded) {
               if (index === expandedItem) {
                    setExpandedItem(null);

                    return;
               }

               setExpandedItem(index);
               return;
          }
     }

     useEffect(() => {
          setExpandedItem(null);
     }, [data]);

     return (
          <>
               {showTop && (
                    <div className="top-list">
                         Wyniki:
                         {items.length > 0 && (
                              <DownloadFile
                                   data={items}
                                   size={"small"}
                                   type={"text"}
                              />
                         )}
                    </div>
               )}
               <List
                    itemLayout={itemLayout}
                    loading={loading}
                    className="container-list"
                    dataSource={items}
                    size="small"
                    pagination={
                         items.length > 10
                              ? { pageSize: 10, align: "center" }
                              : null
                    }
                    renderItem={listItem}
               ></List>
          </>
     );
}
