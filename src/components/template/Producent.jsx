import { SearchOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Button, Modal, Alert, Spin, Flex } from "antd";

import "../../assets/scss/template/Producent.scss";
import { useEffect, useState, Suspense } from "react";

// Components
import ProducentForm from "./ProducentForm";
import DownloadFile from "../DownloadFile";

// Data
import arrangementOfTemplate from "../../assets/composables/arrangementTemplate";
import { useParams } from "react-router-dom";

export default function Producent() {
     const params = useParams();

     // States
     const [openForm, setOpenForm] = useState(false);
     const [dataTable, setDataTable] = useState();
     const [columns, setColumns] = useState([]);
     const [dataForm, setDataForm] = useState();
     const [loading, setLoading] = useState(false);

     // FUNCTIONS
     function createObjectRowData(columns, objData, index) {
          let obj = {};

          columns.forEach((item) => {
               obj[item.key] = objData[item.key];
               obj.key = index;
          });

          return obj;
     }

     function createColumns(structureData) {
          if (!structureData[0]) return;

          let newColumns = [];

          structureData.forEach((item) => {
               newColumns.push({
                    key: item.id,
                    title: item.name,
                    dataIndex: item.id,
               });
          });

          return newColumns;
     }

     function createDataForm(formStructure, manufacturer) {
          if (!formStructure) return;

          let newDataForm = {};

          formStructure.forEach((item) => {
               // w przyszłości mozna uwzglednić ostanio wyszukane dane
               newDataForm[item.id] = null;
          });

          newDataForm.manufacturer = manufacturer;

          return newDataForm;
     }

     async function handleGetData() {
          let url = "https://ozparts.eu/mastercatalogue/data/findItem.php";
          let headers = {
               method: "POST",
               body: JSON.stringify(dataForm),
          };

          setLoading(true);

          const res = await fetch(url, headers);
          const data = await res.json();

          if (data) {
               let readyToDisplayData = [];

               data.data.forEach((item, index) => {
                    readyToDisplayData.push(
                         createObjectRowData(columns, item, index)
                    );
               });

               setDataTable(readyToDisplayData);
               setLoading(false);
               setOpenForm(false);
          }
     }

     // USE EFFECTS
     useEffect(() => {
          if (!arrangementOfTemplate.producent[params.producentId]) return;

          let form = arrangementOfTemplate.producent[params.producentId].form;

          if (!form) return;

          const handleGetData = async () => {
               const newDataForm = createDataForm(form, params.producentId);
               const newColumns = createColumns(form);

               let url = "https://ozparts.eu/mastercatalogue/data/findItem.php";
               let headers = {
                    method: "POST",
                    body: JSON.stringify(newDataForm),
               };

               setLoading(true);

               const res = await fetch(url, headers);
               const data = await res.json();

               if (data) {
                    let readyToDisplayData = [];

                    data.data.forEach((item, index) => {
                         readyToDisplayData.push(
                              createObjectRowData(newColumns, item, index)
                         );
                    });

                    setDataForm(newDataForm);
                    setColumns(newColumns);
                    setDataTable(readyToDisplayData);
                    setLoading(false);
               }
          };
          handleGetData();

          return () => {
               setColumns([]);
               setDataForm({});
          };
     }, [params.producentId]);

     return (
          <>
               <Alert
                    showIcon
                    type="info"
                    message="O co chodzi?"
                    description="Ten widok umożliwia przeszukanie rdzennej tabeli producenta. Jeśli nie znajdziesz tutaj konkretnej części, wynik krosujący zapewne również jej nie zwróci."
                    style={{ marginBottom: 10 }}
               />
               {arrangementOfTemplate.producent[params.producentId] && (
                    <div className="producent-view">
                         <div className="top">
                              <div className="title">
                                   {params && params.producentId}
                              </div>
                              <div style={{display: 'flex', gap: 10}}>
                                   <DownloadFile data={dataTable} loading={loading}/>
                                   <Button
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        iconPosition="start"
                                        onClick={() => setOpenForm(true)}
                                        disabled={loading ? "disabled" : null}
                                   >
                                        Wyszukaj
                                   </Button>
                              </div>
                         </div>

                         <Spin
                              className="spin"
                              spinning={loading}
                              styles={{ margin: 0 }}
                         >
                              <Table
                                   className="table"
                                   columns={columns}
                                   dataSource={dataTable}
                                   scroll
                                   rowKey="key"
                                   fixed={true}
                                   bordered={true}
                                   // eslint-disable-next-line react/jsx-no-duplicate-props
                                   scroll={{
                                        x: 200,
                                        y: 500,
                                   }}
                              />
                         </Spin>

                         <Modal
                              open={openForm}
                              onCancel={() => setOpenForm(false)}
                              title={params.producentId}
                              onOk={() => handleGetData()}
                              confirmLoading={loading}
                              maskClosable={!loading}
                              cancelText="Zamknij"
                              okText="Szukaj"
                         >
                              <ProducentForm
                                   arrangement={
                                        arrangementOfTemplate.producent[
                                             params.producentId
                                        ]
                                   }
                                   dataForm={dataForm}
                                   setDataForm={(newData) =>
                                        setDataForm(newData)
                                   }
                              />
                         </Modal>
                    </div>
               )}
               {!arrangementOfTemplate.producent[params.producentId] && (
                    <Alert
                         showIcon
                         type="error"
                         message="Błąd krytyczny :/"
                         description="Skontakuj się z developerem"
                    />
               )}
          </>
     );
}
