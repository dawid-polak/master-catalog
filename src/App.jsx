import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/scss/App.scss";

import Navbar from "./components/Navbar";
import Menu from "./components/Menu";

import FindItem from "./pages/FindItem";
import Home from "./pages/Home";

function App() {
     return (
          <BrowserRouter>
               <Navbar />
               <Menu />

               <div className="container">
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/findItem" element={<FindItem />} />
                    </Routes>
               </div>
          </BrowserRouter>
     );
}

export default App;
