import { notification } from "antd";
import { useRef, useState } from "react";
import SearchEngine from "./SearchEngine";
import ResultsList from "./ResultsList";
import DetailsModal from "./DetailsModal";

import getDataQuery from "../../../assets/composables/getDataQuery";
import databaseDataMapping from "../../../assets/composables/databaseDataMapping";

export default function MainApplicationSearchEngine() {
     const [api, contextHolder] = notification.useNotification();
     const [results, setResults] = useState([]);
     const [loading, setLoading] = useState(false);
     const [openDetailsModal, setOpenDetailsModal] = useState(false);

     // DATA
     const detailsModalData = useRef({
          title: null,
          sku: null,
          description: null,
          id_producent: null,
     });

     // Get data from server and modified
     async function getResults(query) {
          const res = await getDataQuery(query);

          if (res) {
               let modifiedData = [];

               res.forEach((item) => {
                    for (const key in item) {
                         if (item[key]) {
                              if (modifiedData.length === 0) {
                                   modifiedData.push({
                                        sku: item[key],
                                        id_producent: key,
                                        title: item[key],
                                        description: `Producent: ${databaseDataMapping[key]}`,
                                   });
                              }

                              if (
                                   item[key] !==
                                   modifiedData[modifiedData.length - 1].sku
                              ) {
                                   modifiedData.push({
                                        sku: item[key],
                                        id_producent: key,
                                        title: item[key],
                                        description: `Producent: ${databaseDataMapping[key]}`,
                                   });
                              }
                         }
                    }
               });

               return modifiedData;
          }

          return;
     }

     // Handle run searching data in server
     async function handleSubmitSearchEngine(query) {
          setLoading(true);

          const data = await getResults(query);

          setLoading(false);

          if (!data) {
               return createNotification(
                    "warning",
                    "Coś poszło nie tak!",
                    "Spróboj ponownie"
               );
          }

          setResults(data);
     }

     function handleShowDetails(item) {
          detailsModalData.current = item;
          setOpenDetailsModal(true);
     }

     // Run notifications
     const createNotification = (type, message, description) => {
          api[type]({
               message,
               description,
          });
     };

     return (
          <>
               {contextHolder}

               <DetailsModal
                    open={openDetailsModal}
                    closeModal={() => (
                         setOpenDetailsModal(false),
                         (detailsModalData.current = {
                              title: null,
                              sku: null,
                              description: null,
                              id_producent: null,
                         })
                    )}
                    data={detailsModalData.current}
               />

               <SearchEngine
                    submit={handleSubmitSearchEngine}
                    submitLoading={loading}
               />

               <ResultsList
                    items={results}
                    loading={loading}
                    showDetails={handleShowDetails}
                    showTop={true}
               />
          </>
     );
}
