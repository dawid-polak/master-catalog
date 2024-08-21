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

                         <Link to="/findItem" className="hyperlink">
                              Znajdź item
                         </Link>
                    </ul>
               </div>
          </>
     );
}
