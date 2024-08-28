// A function to retrieve data from a database using a predefined query
const getDataQuery = async (query) => {
     let url = "https://ozparts.eu/mastercatalogue/data/runQuery.php";
     let body = { query: query };
     let headers = {
          method: "POST",
          body: JSON.stringify(body),
     };

     const res = await fetch(url, headers);
     const data = await res.json();

     if (data.data) {
          return data.data;
     }

     return null;
};

export default getDataQuery;
