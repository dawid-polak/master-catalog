let filesDb = [
     {
          name: "brandOptions",
          key: "Brand",
     },
     {
          name: "modelOptions",
          key: "TD_Model",
     },
     {
          name: "engineOptions",
          key: "TD_Engine",
     },
     {
          name: "yearsOfProductionsOptions",
          key: "TD_Engine_From",
     },
     {
          name: "yearsOfProductionsOptions",
          key: "TD_Engine_To",
     },
     {
          name: "powerOptions",
          key: "KM",
     },
     {
          name: "engineYearsOfProductionsPowerOptions",
          key: "TD_Engine, TD_Engine_From, TD_Engine_TO, KM",
     },
];

// Function to create a query to obtain the available filter options for a given field
const createSqlQueryToOptions = (dataForm, idSelect) => {
     let keyDb = filesDb.find((item) => item.name === idSelect).key;

     let sqlQuery = `SELECT DISTINCT ${keyDb} FROM CROSS_DRZEWKO`;

     // Create query to brand
     if (idSelect === "brandOptions") {
          return sqlQuery;
     }

     sqlQuery += ` WHERE `;

     //  Create query to model
     if (idSelect === "modelOptions") {
          sqlQuery = sqlQuery + `Brand = '${dataForm.brand}'`;

          return sqlQuery;
     }

     //  Create query to engine
     if (idSelect === "engineOptions") {
          sqlQuery += `Brand = '${dataForm.brand}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Model = '${dataForm.model}'`;

          return sqlQuery;
     }

     //  Create query to years of productions
     if (idSelect === "yearsOfProductionsOptions") {
          sqlQuery = `SELECT DISTINCT TD_Engine_From, TD_Engine_To FROM CROSS_DRZEWKO WHERE `;

          sqlQuery += `Brand = '${dataForm.brand}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Model = '${dataForm.model}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Engine = '${dataForm.engine}'`;

          return sqlQuery;
     }

     // Create query to powers
     if (idSelect === "powerOptions") {
          let dates = dataForm.yearsOfProductions;

          if (!dates) return;

          let dateFrom = dates.slice(0, 6);
          let dateTo = dates.slice(6, 12);

          sqlQuery += `Brand = '${dataForm.brand}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Model = '${dataForm.model}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Engine = '${dataForm.engine}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Engine_From = '${dateFrom}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Engine_To = '${dateTo}'`;

          return sqlQuery;
     }

     // Create query to engine / yearsOfProductions / power
     if (idSelect === "engineYearsOfProductionsPowerOptions") {
          sqlQuery =
               "SELECT TD_Engine, TD_Engine_From, TD_Engine_TO, KM, kW FROM `CROSS_DRZEWKO` WHERE ";

          sqlQuery += `Brand = '${dataForm.brand}'`;
          sqlQuery += ` AND `;
          sqlQuery += `TD_Model = '${dataForm.model}'`;

          return sqlQuery;
     }
};

export default createSqlQueryToOptions;
