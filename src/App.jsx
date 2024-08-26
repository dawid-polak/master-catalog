import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, theme } from "antd";

const { Content, Footer } = Layout;

// Styles
import "./assets/scss/App.scss";

// Componets
import SiderUi from "./components/UI/SiderUi";
import HeaderUi from "./components/UI/HeaderUi";
import Producent from "./components/template/Producent";

// Pages
import FindItem from "./pages/FindItem";
import Home from "./pages/Home";
import Cross from "./pages/Cross";

function App() {
     const {
          token: { colorBgContainer, borderRadiusLG },
     } = theme.useToken();

     return (
          <Layout
               style={{
                    minHeight: "100vh",
               }}
          >
               <BrowserRouter>
                    <SiderUi />
                    <Layout>
                         <HeaderUi />
                         <Content
                              style={{
                                   margin: "16px 16px 0px 16px",
                                   background: colorBgContainer,
                                   borderRadius: borderRadiusLG,
                              }}
                         >
                              <div className="container">
                                   <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                             path="/findItem"
                                             element={<FindItem />}
                                        />
                                        <Route
                                             path="/cross"
                                             element={<Cross />}
                                        />
                                        <Route
                                             path="/producent/:producentId"
                                             element={<Producent />}
                                        />
                                   </Routes>
                              </div>
                         </Content>
                         <Footer
                              style={{
                                   textAlign: "center",
                              }}
                         >
                              ©{new Date().getFullYear()} Created by 3C ERP
                         </Footer>
                    </Layout>
               </BrowserRouter>
          </Layout>
     );
}

export default App;
