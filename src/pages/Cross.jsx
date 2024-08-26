import { useEffect, useState } from "react";
import { Alert, Table } from "antd";

import arrangementOfTemplate from "../assets/composables/arrangementTemplate";

import "../assets/scss/Cross.scss";

// Componetns
import Form from "../components/cross/Form";

export default function Cross() {
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);

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

          setLoading(false);

          console.log(data);

          if (data) {
          }
     }

     return (
          <>
               <Alert
                    showIcon
                    type="info"
                    message="O co chodzi?"
                    description="Jesteś na widoku formularza, który wysyła zapytania o skrzyowanie częsci producentów. Uwaga wierszy moze być bardzo duzo :)"
               />

               <div className="cross">
                    <h3 className="title">Cross:</h3>
                    {arrangementOfTemplate.cross.form && (
                         <Form
                              arrangement={arrangementOfTemplate.cross.form}
                              loading={loading}
                              submit={(dataForm) => handleGetData(dataForm)}
                         />
                    )}

                    <Table />
               </div>
          </>
     );
}
