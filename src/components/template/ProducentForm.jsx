import { useEffect, useState } from "react";
import { Input, Button } from "antd";

// Styles
import "../../assets/scss/template/ProducentForm.scss";

export default function ProducentForm({ dataForm, arrangement, setDataForm }) {
     let controls = {
          input: Input,
          button: Button,
     };
     //  FUNCTIONS

     function handleSetDataForm(e, control) {
          let newValue = e.target.value;

          setDataForm((prevDataForm) => {
               return {
                    ...prevDataForm,
                    [control.id]: newValue,
               };
          });
     }

     //  RENDER ELEMENTS HTML
     const formStructure = arrangement.form.map((item, index) => {
          let Control = controls[item.control];

          return (
               <div key={index} className="control">
                    <Control
                         placeholder={item.name}
                         type={item.type}
                         value={dataForm[item.id]}
                         onChange={(e) => handleSetDataForm(e, item)}
                    />
               </div>
          );
     });

     return (
          <form className="form">
               {Object.keys(dataForm).length > 0 && formStructure}
          </form>
     );
}
