import { useState } from "react";
import "./Form.scss";

import Table from "./Table";

export default function Form() {
  const [dataForm, setDataForm] = useState({
    brand: "",
    model: "",
    tdEngine: "",
    tdEngineFromYers: "",
    tdEngineToYers: "",
    ktype: "",
    sku: "",
  });

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

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    let url = "https://ozparts.eu/mastercatalogue/data/findItem.php";
    // let url = "https://ozparts.eu/mastercatalogue/skrypt.php";
    // let formData = new FormData()

    let headers = {
      method: "POST",
      body: JSON.stringify(dataForm)
    };

    const res = await fetch(url, headers);
    const data = await res.json();


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
            type="text"
            placeholder="Ktype"
            name="ktype"
            value={dataForm.ktype}
            onChange={handleSetDataForm}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Sku"
            name="sku"
            value={dataForm.sku}
            onChange={handleSetDataForm}
          ></input>
        </div>

        <button type="submit">Szukaj</button>
      </form>
    </>
  );
}
