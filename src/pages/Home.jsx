import { Alert, Select, Input, Button } from "antd";
import { useState } from "react";

import "../assets/scss/Home.scss";

import arrangementOfTemplate from "../assets/composables/arrangementTemplate";

import AppsForm from "../components/home/AppsForm";

// Components
import BigTable from "../components/BigTable";

export default function Home() {
     const [brands, setBrands] = useState([]);
     const [models, setModels] = useState([]);
     const [apps, setApps] = useState([]);
     const [appForm, setAppForm] = useState({
          brand: null,
          model: null,
          application: null,
     });

     const controls = {
          input: Input,
          select: Select,
     };

     async function handleGetBrands() {
          let url = "https://ozparts.eu/mastercatalogue/data/findBrand.php";

          const res = await fetch(url);
          const data = await res.json();

          if (data.data) {
               return data.data;
          }
     }

     async function handleGetDataFromServer(query) {
          let url = "https://ozparts.eu/mastercatalogue/data/runQuery.php";
          let body = { query: query };
          let headers = {
               method: "POST",
               body: JSON.stringify(body),
          };

          const res = await fetch(url, headers);
          const data = await res.json();

          if (data) {
               return data.data;
          }
     }

     function handleSetAppsForm(value, item) {
          if (item === "brand") {
               setApps(null);
               setModels(null);
          }

          setAppForm((prevAppForm) => {
               return {
                    ...prevAppForm,
                    [item]: value,
               };
          });

          return;
     }

     async function handleFocusControl(item) {
          if (item.id === "brand") {
               const data = await handleGetBrands();

               let newData = data.map((item) => {
                    return { label: item.Brand, value: item.Brand };
               });

               setBrands(newData);

               return;
          }

          if (item.id === "model") {
               let query = `SELECT DISTINCT Model FROM CROSS_DRZEWKO WHERE Brand = '${appForm.brand}'`;

               const data = await handleGetDataFromServer(query);

               let newData = data.map((item) => {
                    return { label: item.Model, value: item.Model };
               });

               setModels(newData);

               return;
          }

          if (item.id === "application") {
               let query = `SELECT DISTINCT TD_Engine FROM CROSS_DRZEWKO WHERE Brand = '${
                    appForm.brand
               }'${
                    appForm.model ? " AND Model = " + `'${appForm.model}'` : ""
               }`;

               const data = await handleGetDataFromServer(query);

               let newData = data.map((item) => {
                    return { label: item.TD_Engine, value: item.TD_Engine };
               });

               setApps(newData);

               return;
          }
     }

     function filterSort(optionA, optionB) {
          return (optionA?.label ?? "")
               .toLowerCase()
               .localeCompare((optionB?.label ?? "").toLowerCase());
     }

     const formElements = arrangementOfTemplate.crossSelect.form.map(
          (item, index) => {
               let Control = controls[item.control];

               if (item.control === "select") {
                    return (
                         <div key={index} className="control">
                              <Control
                                   value={appForm[item.id]}
                                   placeholder={item.name}
                                   style={{ width: "100%" }}
                                   showSearch
                                   onChange={(e) =>
                                        handleSetAppsForm(e, item.id)
                                   }
                                   onFocus={() => handleFocusControl(item)}
                                   options={
                                        item.id === "brand"
                                             ? brands
                                             : item.id === "model"
                                             ? models
                                             : apps
                                   }
                                   optionFilterProp="label"
                                   filterSort={(optionA, optionB) =>
                                        filterSort(optionA, optionB)
                                   }
                              />
                         </div>
                    );
               }

               if (item.control === "input") {
                    return;
               }
          }
     );

     return (
          <>
               <Alert
                    showIcon
                    message="Cześć!"
                    description="Ten widok czeka na aktualizację. Przejdź do innych podstron."
               />
               <div className="row">
                    {/* <form className="col">
                         <div className="title">
                              <p>Wyszukaj aplikacje</p>
                         </div>
                         {formElements}
                         <div
                              style={{
                                   display: "flex",
                                   justifyContent: "space-between",
                                   alignItems: "center",
                              }}
                         >
                              <Button type="primary" htmlType="submit">
                                   Szukaj
                              </Button>
                              <Button type="outlined" size="small">
                                   Resetuj
                              </Button>
                         </div>
                    </form> */}
                    {/* <form className="col">
                         <div className="title">
                              <p>Znajdź część</p>

                              <Input
                                   type="text"
                                   placeholder="SKU"
                                   className="control"
                              />

                              <Button type="primary">Szukaj</Button>
                         </div>
                    </form> */}
               </div>
               <div className="row">
                    <div className="col">
                         <div className="title">
                              <p>Wyszukaj aplikacje</p>
                         </div>

                         <AppsForm />
                    </div>
               </div>
               <div className="row">
                    <div className="col">
                         <div className="title">
                              <p>Wyniki</p>
                         </div>

                         <BigTable data={null} />
                    </div>
               </div>
          </>
     );
}
