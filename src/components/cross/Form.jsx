import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import DownloadFile from "../DownloadFile";

export default function Form({
     arrangement,
     loading,
     submit,
     allowDownload,
     data,
}) {
     const controls = {
          input: Input,
     };

     const [dataForm, setDataForm] = useState({});

     //  RENDER HTML ELEMENT
     function handleSetDataForm(e, item) {
          setDataForm((prevDataForm) => {
               return { ...prevDataForm, [item.id]: e.target.value };
          });
     }

     const formStructure = arrangement.map((item, index) => {
          let Control = controls[item.control];

          return (
               <div
                    key={index} 
                    className="control"
                    style={{ marginBottom: 10 }}
               >
                    <Control
                         placeholder={item.name}
                         value={dataForm[item.id]}
                         onChange={(e) => handleSetDataForm(e, item)}
                    />
               </div>
          );
     });

     //  FUNCTIONS
     function handleSubmit(e) {
          e.preventDefault();
          submit(dataForm);
     }

     function createDataForm() {
          arrangement.forEach((item) => {
               setDataForm((prevDataForm) => {
                    return {
                         ...prevDataForm,
                         [item.id]: null,
                    };
               });
          });
     }

     //  USE EFFECTS
     useEffect(() => {
          createDataForm();
     }, []);

     return (
          <>
               <form onSubmit={handleSubmit} style={{ margin: 10 }}>
                    {arrangement && formStructure}

                    {allowDownload && (
                         <DownloadFile loading={loading} data={data} />
                    )}

                    <Button
                         type="primary"
                         icon={<SearchOutlined />}
                         loading={loading}
                         htmlType="submit"
                    >
                         Szukaj
                    </Button>
               </form>
          </>
     );
}
