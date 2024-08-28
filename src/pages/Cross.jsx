import { useEffect, useState } from "react";
import { Alert, Table, Spin } from "antd";

import arrangementOfTemplate from "../assets/composables/arrangementTemplate";

import "../assets/scss/Cross.scss";

// Componetns
import Form from "../components/cross/Form";

export default function Cross() {
     const [data, setData] = useState([]);
     const [columns, setColumns] = useState([]);
     const [loading, setLoading] = useState(false);

     const nameProducents = {
          sku_bd: "Sku Bd",
          sku_brembo: "Sku Brembo",
          sku_dba: "Sku Dba",
          sku_ebc: "Sku Ebc",
          sku_sdt: "Sku Sdt",
          TD_Engine: 'TD Engine',
          TD_Engine_From: 'TD Engine From',
          TD_Engine_To: 'TD Engine To'
     };

     //  FUNCTIONS

     //  function to create a queried end to a database
     const createQuery = (dataForm) => {
          let query = "";

          for (const key in dataForm) {
               if (dataForm[key]) {
                    if (key === "ktype") {
                         query = query + ` \`${key}\` = ${dataForm[key]} AND`;
                    } else {
                         query =
                              query + ` \`${key}\` LIKE '${dataForm[key]}' AND`;
                    }
               }
          }

          query = query.slice(0, -4);

          return query;
     };

     function createColumns(rowObj) {
          if (!rowObj) return;

          let newColumns = [];

          for (const key in rowObj) {
               newColumns.push({
                    key: key,
                    title: nameProducents[key] ? nameProducents[key] : key,
                    dataIndex: key,
               });
          }

          return newColumns;
     }

     function creataDataToTable(columns, data) {
          if (!columns || !data) return;

          return data.map((item, index) => {
               return { ...item, key: index };
          });
     }

     async function handleGetData(dataForm) {
          let body = {
               ...dataForm,
               query: createQuery(dataForm),
          };

          let url = "https://ozparts.eu/mastercatalogue/data/crossItems.php";

          let headers = {
               method: "POST",
               body: JSON.stringify(body),
          };

          setLoading(true);

          const res = await fetch(url, headers);
          const data = await res.json();

          if (data) {
               const newColumns = createColumns(data.data[0]);
               const newData = creataDataToTable(newColumns, data.data);

               setColumns(newColumns);
               setData(newData);
               setLoading(false);

               return;
          }
     }

     return (
          <>
               <Alert
                    showIcon
                    type="info"
                    message="O co chodzi?"
                    description="Jesteś na widoku formularza, który wysyła zapytania o skrzyżowanie części producentów. Uwaga: wierszy może być bardzo dużo :)"
               />

               <div className="cross">
                    <h3 className="title">Cross:</h3>
                    {arrangementOfTemplate.cross.form && (
                         <Form
                              arrangement={arrangementOfTemplate.cross.form}
                              allowDownload={data[0] ? true : false}
                              loading={loading}
                              submit={(dataForm) => handleGetData(dataForm)}
                              data={data}
                         />
                    )}

                    <Spin spinning={loading}>
                         <Table
                              columns={columns}
                              dataSource={data}
                              scroll
                              rowKey="key"
                              fixed={true}
                              bordered={true}
                              // eslint-disable-next-line react/jsx-no-duplicate-props
                              scroll={{
                                   x: 200,
                                   y: 470,
                              }}
                         />
                    </Spin>
               </div>
          </>
     );
}
