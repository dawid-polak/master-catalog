const arrangementOfTemplate = {
     producent: {
          dba: {
               id: "dba",
               name: "DBA",
               form: [
                    {
                         id: "id",
                         name: "ID",
                         control: "input",
                         type: "number",
                    },
                    {
                         id: "sku",
                         name: "Numer sku",
                         control: "input",
                         type: "string",
                    },
                    {
                         id: "oem",
                         name: "Numer oem",
                         control: "input",
                         type: "string",
                    },
               ],
          },
          ebc: {
               id: "ebc",
               name: "EBC",
               form: [
                    {
                         id: "id",
                         name: "ID",
                         control: "input",
                         type: "number",
                    },
                    {
                         id: "sku",
                         name: "Numer sku",
                         control: "input",
                         type: "string",
                    },
                    {
                         id: "oem",
                         name: "Numer oem",
                         control: "input",
                         type: "string",
                    },
               ],
          },
          bd: {
               id: "bd",
               name: "Black Diamond",
               form: [
                    {
                         id: "id",
                         name: "ID",
                         control: "input",
                         type: "number",
                    },
                    {
                         id: "sku",
                         name: "Numer sku",
                         control: "input",
                         type: "string",
                    },
                    {
                         id: "oem",
                         name: "Numer oem",
                         control: "input",
                         type: "string",
                    },
               ],
          },
          sdt: {
               id: "sdt",
               name: "Black Diamond",
               form: [
                    {
                         id: "id",
                         name: "ID",
                         control: "input",
                         type: "number",
                    },
                    {
                         id: "sku",
                         name: "Numer sku",
                         control: "input",
                         type: "string",
                    },
                    {
                         id: "oem",
                         name: "Numer oem",
                         control: "input",
                         type: "string",
                    },
               ],
          },
          mintex: {
               id: "mintex",
               name: "Black Diamond",
               form: [
                    {
                         id: "id",
                         name: "ID",
                         control: "input",
                         type: "number",
                    },
                    {
                         id: "sku",
                         name: "Numer sku",
                         control: "input",
                         type: "string",
                    },
                    {
                         id: "oem",
                         name: "Numer oem",
                         control: "input",
                         type: "string",
                    },
               ],
          },
          brembo: {
               id: "brembo",
               name: "Black Diamond",
               form: [
                    {
                         id: "id",
                         name: "ID",
                         control: "input",
                         type: "number",
                    },
                    {
                         id: "sku",
                         name: "Numer sku",
                         control: "input",
                         type: "string",
                    },
                    {
                         id: "oem",
                         name: "Numer oem",
                         control: "input",
                         type: "string",
                    },
               ],
          },
     },
     cross: {
          id: "cross",
          name: "Cross",
          form: [
               {
                    id: "brand",
                    name: "Brand",
                    control: "input",
                    type: "text",
               },
               {
                    id: "model",
                    name: "Model",
                    control: "input",
                    type: "text",
               },
               {
                    id: "tdEngine",
                    name: "TD Engine",
                    control: "input",
                    type: "text",
               },
               {
                    id: "tdEngineFromYers",
                    name: "TD Engine from (date)",
                    control: "input",
                    type: "text",
               },
               {
                    id: "tdEngineToYers",
                    name: "TD Engine to (date)",
                    control: "input",
                    type: "text",
               },
               {
                    id: "ktype",
                    name: "Ktype",
                    control: "input",
                    type: "number",
               },
          ],
     },
     crossSelect: {
          id: "crossSelect",
          name: "Wyszukaj aplikacje",
          form: [
               {
                    id: "brand",
                    name: "Marka",
                    control: "select",
               },
               {
                    id: "model",
                    name: "Model",
                    control: "select",
               },
               {
                    id: "application",
                    name: "Aplikacja",
                    control: "select",
               },
          ],
     },
};

export default arrangementOfTemplate;
