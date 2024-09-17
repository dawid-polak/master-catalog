// function takes a date in the format YYYYMMYYYMM as a string
const dateFormatting = (date) => {
     if (!date) return;

     const months = [
          "Styczeń",
          "Luty",
          "Marzec",
          "Kwiecień",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "Sierpień",
          "Wrzesień",
          "Październik",
          "Listopad",
          "Grudzień",
     ];

     const firstYear = date.slice(0, 4);
     const firstMonth = date.slice(4, 6);
     const secondYear = date.slice(6, 10);
     const secondMonth = date.slice(10, 12);

     const firstMonthName = months[parseInt(firstMonth, 10) - 1];
     const secondMonthName = months[parseInt(secondMonth, 10) - 1];

     return `${firstYear} ${firstMonthName} - ${secondYear} ${secondMonthName}`;
};

export default dateFormatting;
