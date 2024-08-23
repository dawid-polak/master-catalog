import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, theme } from "antd";

const { Header, Content, Footer } = Layout;

// Styles
import "./assets/scss/App.scss";

// Componets
import SiderUi from "./components/SiderUi";

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
               <SiderUi />
               <Layout>
                    <Header
                         style={{
                              background: colorBgContainer,
                         }}
                    />

                    <Content
                         style={{
                              margin: "16px 16px 0px 16px",
                              background: colorBgContainer,
                              borderRadius: borderRadiusLG,
                         }}
                    >
                         <BrowserRouter>
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
                                   </Routes>
                              </div>
                         </BrowserRouter>
                    </Content>
                    <Footer
                         style={{
                              textAlign: "center",
                         }}
                    >
                         ©{new Date().getFullYear()} Created by 3C ERP
                    </Footer>
               </Layout>
          </Layout>
     );
}

export default App;
