import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "./assets/scss/App.scss";

// Componets
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";

// Pages
import FindItem from "./pages/FindItem";
import Home from "./pages/Home";
import Cross from "./pages/Cross";

function App() {
     return (
          <BrowserRouter>
               <Navbar />
               <Menu />

               <div className="container">
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/findItem" element={<FindItem />} />
                         <Route path="/cross" element={<Cross />}/>
                    </Routes>
               </div>
          </BrowserRouter>
     );
}

export default App;
