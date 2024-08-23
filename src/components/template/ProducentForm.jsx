import { useEffect, useState } from "react";
import { Input, Button } from "antd";

// Styles
import "../../assets/scss/template/ProducentForm.scss";

export default function ProducentForm({ producent, arrangement }) {
     const [dataForm, setDataForm] = useState({});

     let controls = {
          input: Input,
          button: Button,
     };

     //  USE EFFECTS
     useEffect(() => {
          createDataForm(arrangement.form);
     }, [arrangement]);

     //  FUNCTIONS
     function createDataForm(formStructure) {
          if (!formStructure) return;

          setDataForm((prevState) => {
               const newDataForm = { ...prevState };

               formStructure.forEach((item) => {
                    // w przyszłości mozna uwzglednić ostanio wyszukane dane
                    newDataForm[item.id] = null;
               });

               return newDataForm;
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
