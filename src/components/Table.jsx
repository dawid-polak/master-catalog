import { useEffect, useId, useState } from "react";
import "../assets/scss/Table.scss";

export default function Table({ data }) {
     const id = useId();

     const [pagination, setPagination] = useState({
          page: 0,
          itemsPerPage: 10,
          totalPages: 0,
     });

     const [itemDisplay, setItemDisplay] = useState([]);

     function handleSetPagination(e) {
          let name = e.target.name;
          let value = Number(e.target.value);

          if (["prev", "next"].includes(name)) {
               setPagination((prevPagination) => {
                    return {
                         ...prevPagination,
                         page:
                              name === "next"
                                   ? pagination.page + 1
                                   : pagination.page > 1
                                   ? pagination.page - 1
                                   : 0,
                    };
               });

               return;
          }

          setPagination((prevPagination) => {
               return { ...prevPagination, [name]: value };
          });
     }

     useEffect(() => {
          let newItemDisplay = [];
          let countDisplayItems = 0;
          let indexStart = pagination.page * pagination.itemsPerPage;

          data.forEach((item, index) => {
               countDisplayItems += countDisplayItems;

               if (countDisplayItems >= pagination.itemsPerPage) return;

               if (index >= indexStart) {
                    newItemDisplay.push(item);
               }
          });

          setItemDisplay(newItemDisplay);

          return () => {
               setItemDisplay([]);
          };
     }, [pagination, data]);

     const elementHtml = itemDisplay.map((item, index) => {
          if (index <= pagination.itemsPerPage - 1) {
               return (
                    <tr key={index}>
                         <td>{item.id}</td>
                         <td>{item.sku}</td>
                         <td>{item.oem}</td>
                    </tr>
               );
          }
     });

     return (
          <>
               <table>
                    <thead>
                         <tr>
                              <th>ID</th>
                              <th>SKU</th>
                              <th>OEM</th>
                         </tr>
                    </thead>
                    <tbody>{elementHtml}</tbody>
                    <tfoot>
                         <tr>
                              <th colSpan="3">
                                   <div className="pagination">
                                        <div className="settings">
                                             <button
                                                  name="prev"
                                                  onClick={handleSetPagination}
                                             >
                                                  &#60;
                                             </button>
                                             <input
                                                  type="text"
                                                  value={pagination.page}
                                                  name="page"
                                                  onChange={handleSetPagination}
                                             />
                                             <button
                                                  name="next"
                                                  onClick={handleSetPagination}
                                             >
                                                  &#62;
                                             </button>
                                        </div>

                                        <div className="items-per-page">
                                             <label
                                                  htmlFor={id + "-itemsPerPage"}
                                             >
                                                  Liczba wierszy na strone:
                                             </label>

                                             <select
                                                  id={id + "-itemsPerPage"}
                                                  value={
                                                       pagination.itemsPerPage
                                                  }
                                                  name="itemsPerPage"
                                                  onChange={handleSetPagination}
                                             >
                                                  <option value="5">5</option>
                                                  <option value="10">10</option>
                                                  <option value="25">25</option>
                                                  <option value="50">50</option>
                                                  <option value="100">
                                                       100
                                                  </option>
                                             </select>
                                        </div>
                                   </div>
                              </th>
                         </tr>
                    </tfoot>
               </table>
          </>
     );
}

Table.propTypes = {
     data: [],
};
