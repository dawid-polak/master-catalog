import { Layout } from "antd";
import { Menu } from "antd";
import {
     SlidersOutlined,
     BoxPlotOutlined,
     HomeOutlined,
     SwapOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

import "../../assets/scss/UI/Sider.scss";

export default function SiderUi() {
     const navigate = useNavigate();
     const { pathname } = useLocation();

     const items = [
          {
               key: "/",
               label: "Strona główna",
               icon: <HomeOutlined />,
          },
          {
               key: '/comparisonEngine',
               label: 'Porównywarka',
               icon: <SwapOutlined />
          },
          {
               key: "/cross",
               label: "Cross",
               icon: <BoxPlotOutlined />,
          },
          {
               key: "producent",
               label: "Producenci",
               icon: <SlidersOutlined />,
               children: [
                    {
                         key: "/producent/dba",
                         label: "DBA",
                    },
                    {
                         key: "/producent/ebc",
                         label: "EBC",
                    },
                    {
                         key: "/producent/sdt",
                         label: "SDT",
                    },
                    {
                         key: "/producent/bd",
                         label: "Black Diamond",
                    },
                    {
                         key: "/producent/brembo",
                         label: "Brembo",
                    },
                    {
                         key: "/producent/mintex",
                         label: "Mintex",
                    },
               ],
          },
     ];

     // Functions
     // Change path
     function handleNavigate(e) {
          return navigate(e.key);
     }

     return (
          <Sider className="sider-ui" breakpoint="lg" collapsedWidth="0">
               <div style={{ textAlign: "center" }}>
                    <h1>Master Katalog</h1>
               </div>

               <Menu
                    className="menu"
                    onClick={handleNavigate}
                    defaultSelectedKeys={pathname}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    theme="dark"
                    items={items}
               />
          </Sider>
     );
}
