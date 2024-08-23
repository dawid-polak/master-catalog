import { SearchOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Button, Modal } from "antd";

import "../../assets/scss/template/Producent.scss";
import { useState } from "react";

// Components
import ProducentForm from "./ProducentForm";

// Data
import arrangementOfTemplate from "../../assets/composables/arrangementTemplate";

export default function Producent() {
     const columns = [
          {
               title: "Name",
               dataIndex: "name",
               key: "name",
               render: (text) => <a>{text}</a>,
          },
          {
               title: "Age",
               dataIndex: "age",
               key: "age",
          },
          {
               title: "Address",
               dataIndex: "address",
               key: "address",
          },
          {
               title: "Tags",
               key: "tags",
               dataIndex: "tags",
               render: (_, { tags }) => (
                    <>
                         {tags.map((tag) => {
                              let color = tag.length > 5 ? "geekblue" : "green";
                              if (tag === "loser") {
                                   color = "volcano";
                              }
                              return (
                                   <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                   </Tag>
                              );
                         })}
                    </>
               ),
          },
          {
               title: "Action",
               key: "action",
               render: (_, record) => (
                    <Space size="middle">
                         <a>Invite {record.name}</a>
                         <a>Delete</a>
                    </Space>
               ),
          },
     ];

     const data = [
          {
               key: "1",
               name: "John Brown",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["nice", "developer"],
          },
          {
               key: "2",
               name: "Jim Green",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["loser"],
          },
          {
               key: "3",
               name: "Joe Black",
               age: 32,
               address: "Sydney No. 1 Lake Park",
               tags: ["cool", "teacher"],
          },
     ];

     const [openForm, setOpenForm] = useState(false);

     return (
          <>
               <div className="top">
                    <div className="title">DBA</div>
                    <Button
                         type="primary"
                         icon={<SearchOutlined />}
                         iconPosition="start"
                         onClick={() => setOpenForm(true)}
                    >
                         Wyszukaj
                    </Button>
               </div>

               <Table columns={columns} dataSource={data} />

               <Modal
                    open={openForm}
                    onCancel={() => setOpenForm(false)}
                    title="DBA"
               >
                    <ProducentForm
                         producent={"dba"}
                         arrangement={arrangementOfTemplate.producent["dba"]}
                    />
               </Modal>
          </>
     );
}
