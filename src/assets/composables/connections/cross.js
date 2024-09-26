// function that returns the crossed manufacturer data
const getCrossItems = async (ktypes) => {
     let url = "https://ozparts.eu/mastercatalogue/new/cross.php";
     let body = { ktype: ktypes };
     let options = {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
     };

     try {
          const res = await fetch(url, options);

          if (!res.ok) {
               throw new Error(`Error: ${res.status} ${res.statusText}`);
          }

          const data = await res.json();

          return data;
     } catch (error) {
          console.error("Fetch error:", error);
     }
};

export default getCrossItems;
