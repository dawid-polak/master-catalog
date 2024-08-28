import { Table, Spin } from "antd";
import { useEffect, useState } from "react";

// Data
import namesColumnsTable from "../assets/composables/namesColumnsTable";

export default function BigTable({ data, loadingData }) {
     const [columns, setColumns] = useState();

     function createColumns(dataObj) {
          let newColumns = [];

          for (const key in dataObj) {
               newColumns.push({
                    key: key,
                    title: namesColumnsTable[key]
                         ? namesColumnsTable[key]
                         : key,
                    dataIndex: key,
               });
          }

          return newColumns;
     }

     useEffect(() => {
          // Set columns
          if (data) {
               const newColumns = createColumns(data[0]);
               setColumns(newColumns);
          }
     }, [data]);

     return (
          <>
               <Spin spinning={loadingData}>
                    <Table columns={columns} />
               </Spin>
          </>
     );
}
