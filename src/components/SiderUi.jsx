import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function SiderUi() {
     return (
          <Sider breakpoint="lg" collapsedWidth="0">
               <div style={{ textAlign: "center" }}>
                    <h1>MasterKatalog</h1>
               </div>
               {/* <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={items}
               /> */}

               <div>
                    <ul>
                         {/* <Link to="/" className="hyperlink">
                              Strona Główna
                         </Link>

                         <Link to="/findItem" className="hyperlink">
                              Znajdź item
                         </Link>

                         <Link to="/cross" className="hyperlink">
                              Cross
                         </Link> */}
                    </ul>
               </div>
          </Sider>
     );
}
