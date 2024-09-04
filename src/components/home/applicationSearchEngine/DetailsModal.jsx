import { useEffect, useState } from "react";
import { Tabs, Modal } from "antd";
import {
     InfoCircleOutlined,
     CameraOutlined,
     CarOutlined,
} from "@ant-design/icons";
import ApplicationRelated from "./ApplicationRelated";

import "../../../assets/scss/home/DetailsModal.scss";

export default function DetailsModal({ open, data, closeModal }) {
     const [tabs, setTabs] = useState([]);

     useEffect(() => {
          setTabs([
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
                         <ApplicationRelated
                              data={data}
                              expanded={true}
                              showTop={false}
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
          ]);
     }, [data.sku]);
     return (
          <>
               <Modal
                    className="details-modal"
                    okText={"Ok"}
                    cancelText={"Zamknij"}
                    onOk={() => closeModal()}
                    onCancel={() => closeModal()}
                    open={open}
                    title={data.title}
                    maskClosable={false}
                    closeIcon={false}
                    width={"100vw"}
               >
                    <Tabs items={tabs} defaultActiveKey={1} />
               </Modal>
          </>
     );
}
