import { Link } from "react-router-dom";

import "../assets/scss/Menu.scss";

export default function Menu() {
     return (
          <>
               <div className="menu">
                    <ul>
                         <Link to="/" className="hyperlink">
                              Strona Główna
                         </Link>

                         <Link to="/comparisonEngine" className="hyperlink">
                              Porównywarka
                         </Link>

                         <Link to="/findItem" className="hyperlink">
                              Znajdź item
                         </Link>

                         <Link to="/cross" className="hyperlink">
                              Cross
                         </Link>
                    </ul>
               </div>
          </>
     );
}
