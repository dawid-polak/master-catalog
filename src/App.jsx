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
                    height: "100vh",
               }}
          >
               <BrowserRouter>
                    <SiderUi />
                    <Layout
                         style={{
                              backgroundColor: "rgba(0%, 0%, 0%, 0)",
                              padding: 10,
                              marginBottom: 10,
                              overflowY: "auto",
                         }}
                    >
                         <HeaderUi />
                         <Content
                              style={{
                                   borderRadius: borderRadiusLG,
                              }}
                         >
                              <Routes>
                                   <Route path="/" element={<Home />} />
                                   <Route
                                        path="/findItem"
                                        element={<FindItem />}
                                   />
                                   <Route path="/cross" element={<Cross />} />
                                   <Route
                                        path="/producent/:producentId"
                                        element={<Producent />}
                                   />
                              </Routes>
                              <Footer
                                   style={{
                                        textAlign: "center",
                                        borderRadius: "10px",
                                        background: colorBgContainer,
                                        marginTop: "10px",
                                   }}
                              >
                                   ©{new Date().getFullYear()} Created by 3C ERP
                              </Footer>
                         </Content>
                    </Layout>
               </BrowserRouter>
          </Layout>
     );
}

export default App;
