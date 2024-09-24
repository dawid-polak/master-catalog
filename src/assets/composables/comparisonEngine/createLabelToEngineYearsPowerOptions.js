const createLabelToEngineYearsPowerOptions = (strValue) => {
     let formatedLabel = "";

     if (!strValue) return formatedLabel;

     let arrStrValue = strValue.split(";");

     if (arrStrValue.length === 1) return formatedLabel;

     let engine = arrStrValue[4] ? arrStrValue[4] : "";
     let km = arrStrValue[3] ? arrStrValue[3] + " hp" : "";
     let yearsTo = arrStrValue[2];
     let yearsFrom = arrStrValue[1];
     let kW = arrStrValue[0] ? arrStrValue[0] + " kw" : "";

     formatedLabel = `${engine} | ${kW} | ${km} | ${
          yearsFrom !== "null"
               ? yearsFrom.slice(0, 4) + "/" + yearsFrom.slice(4, 6)
               : ""
     } ${
          yearsTo !== "null"
               ? " - " + yearsTo.slice(0, 4) + "/" + yearsTo.slice(4, 6)
               : " "
     }`;

     return formatedLabel;
};

export default createLabelToEngineYearsPowerOptions;
