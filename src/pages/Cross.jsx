import { useState } from "react";

// Styles
import "../assets/scss/Form.scss";

// Components
import Table from "../components/Table";

export default function Cross() {
     const [dataForm, setDataForm] = useState({
          brand: "",
          model: "",
          tdEngine: "",
          tdEngineFromYers: "",
          tdEngineToYers: "",
          ktype: "",
        //   sku: "",
     });

     const [data, setData] = useState([]);

     //  FUNCTIONS
     const handleSetDataForm = (e) => {
          let name = e.target.name;
          let value = e.target.value;

          setDataForm((prevSetDataForm) => {
               return {
                    ...prevSetDataForm,
                    [name]: value,
               };
          });
     };

     //  function to create a queried end to a database
     const createQuery = () => {
          let query = "";

          for (const key in dataForm) {
               if (dataForm[key].length !== 0) {
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

     const handleSubmitForm = async (e) => {
          e.preventDefault();

          let url = "https://ozparts.eu/mastercatalogue/data/crossItems.php";

          let headers = {
               method: "POST",
               body: JSON.stringify({ ...dataForm, query: createQuery() }),
          };

          const res = await fetch(url, headers);
          const data = await res.json();

          setData(data);

          console.log(createQuery());

          console.log(data);
     };

     return (
          <>
               <h3 className="title">Cross:</h3>

               <form onSubmit={handleSubmitForm} className="form">
                    <div>
                         <input
                              type="text"
                              placeholder="Brand"
                              name="brand"
                              value={dataForm.brand}
                              onChange={handleSetDataForm}
                         ></input>

                         <input
                              type="text"
                              placeholder="Model"
                              name="model"
                              value={dataForm.model}
                              onChange={handleSetDataForm}
                         ></input>

                         <input
                              type="text"
                              placeholder="TD Engine"
                              name="tdEngine"
                              value={dataForm.tdEngine}
                              onChange={handleSetDataForm}
                         ></input>
                    </div>

                    <div>
                         <input
                              type="text"
                              placeholder="TD Engine from (date)"
                              name="tdEngineFromYers"
                              value={dataForm.tdEngineFromYers}
                              onChange={handleSetDataForm}
                         ></input>

                         <input
                              type="text"
                              placeholder="TD Engine to (date)"
                              name="tdEngineToYers"
                              value={dataForm.tdEngineToYers}
                              onChange={handleSetDataForm}
                         ></input>

                         <input
                              type="number"
                              placeholder="Ktype"
                              name="ktype"
                              value={dataForm.ktype}
                              onChange={handleSetDataForm}
                         ></input>
                    </div>
                    <div>
                         {/* <input
                              type="text"
                              placeholder="Sku"
                              name="sku"
                              value={dataForm.sku}
                              onChange={handleSetDataForm}
                         ></input> */}
                    </div>

                    <button type="submit">Szukaj</button>
               </form>

               <div className="table">
                    {/* <Table data={data} title={titleTable} /> */}
               </div>
          </>
     );
}
