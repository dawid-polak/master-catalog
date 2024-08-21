import { useState } from "react";
import "../assets/scss/FindItem.scss";

import Table from "../components/Table";

export default function FindItem() {
     const [dataForm, setDataForm] = useState({
          manufacturer: "",
          sku: "",
          oem: "",
     });

     const [data, setData] = useState([]);

     function handleSetDataForm(e) {
          let name = e.target.name;
          let value = e.target.value;

          setDataForm((prevDataForm) => {
               return {
                    ...prevDataForm,
                    [name]: value,
               };
          });
     }

     function clearData() {
          // setDataForm((prevDataForm) => {
          //   return {};
          // });
     }

     async function handleSubmitBtn(e) {
          e.preventDefault();

          const url = "https://ozparts.eu/mastercatalogue/data/findItem.php";
          const headers = {
               method: "POST",
               body: JSON.stringify(dataForm),
          };

          const res = await fetch(url, headers);
          const data = await res.json();

          if (data) {
               clearData();

               console.log(data.data);
               setData(data.data);
          }
     }

     return (
          <>
               <h3 className="title">Znajdź pozycje magazynowe:</h3>

               <form onSubmit={handleSubmitBtn}>
                    <div>
                         <select
                              placeholder="Producent"
                              name="manufacturer"
                              onChange={handleSetDataForm}
                         >
                              <option value="--">Producent</option>
                              <option value="dba">DBA</option>
                              <option value="bd">Black Diamond</option>
                              <option value="brembo">Brembo</option>
                              <option value="sdt">SDT</option>
                              <option value="ebc">EBC</option>
                              <option value="mintex">Mintex</option>
                         </select>
                         <input
                              type="text"
                              placeholder="Sku"
                              name="sku"
                              onChange={handleSetDataForm}
                         />
                         <input
                              type="text"
                              placeholder="Oem"
                              name="oem"
                              onChange={handleSetDataForm}
                         />
                    </div>

                    <button>Szukaj</button>
               </form>

               <div className="table">
                    <Table data={data} />
               </div>
          </>
     );
}
