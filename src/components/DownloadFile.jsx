import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export default function DownloadFile({ loading, data, size, type }) {
     const [loadingDownload, setLoadingDownload] = useState(false);

     function handleDownloadData() {

          if (!data) return;

          setLoadingDownload(true);

          let fileName = "MasterKatalogData.json";
          let fileType = "json";
          let newData = JSON.stringify(data);

          const blob = new Blob([newData], { type: fileType });

          const a = document.createElement("a");
          a.download = fileName;
          a.href = window.URL.createObjectURL(blob);
          const clickEvt = new MouseEvent("click", {
               view: window,
               bubbles: true,
               cancelable: true,
          });
          a.dispatchEvent(clickEvt);
          a.remove();

          setLoadingDownload(false);
     }

     return (
          <>
               <Button
                    onClick={() => handleDownloadData()}
                    icon={<DownloadOutlined />}
                    disabled={loading}
                    loading={loadingDownload}
                    size={size ? size : null}
                    type={type ? type : null}
               />
          </>
     );
}
