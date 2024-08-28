import { useEffect, useState } from "react";

import Table from "../components/BigTable";
import NoData from "../components/NoData";

export default function FindItem() {
     const [dataForm, setDataForm] = useState({
          manufacturer: "",
          sku: "",
          oem: "",
     });

     const [data, setData] = useState([]);
     const [columns, setColumns] = useState([]);

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

     // USE EFFECTS
     useEffect(() => {

          // create columns for the table
          setColumns(() => {
               let newColumns = [];
               let firstDataIndex = data[0];

               if (firstDataIndex) {
                    for (const key in firstDataIndex) {
                         newColumns.push(key);
                    }

                    return newColumns;
               }

               return [];
          });
     }, [data]);

     // FUNCTIONS
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
                              required
                         >
                              <option value="" placeholder="Wybierz producenta">
                                   Wybierz producenta
                              </option>
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
                    {columns[0] && <Table data={data} columns={columns} />}
                    {!columns[0] && dataForm.manufacturer && <NoData />}
               </div>
          </>
     );
}
