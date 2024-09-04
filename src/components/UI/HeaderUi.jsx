import { Layout, theme } from "antd";

const { Header } = Layout;

import '../../assets/scss/UI/Header.scss'

export default function HeaderUi() {
     const {
          token: { colorBgContainer },
     } = theme.useToken();

     return (
          <Header
               style={{
                    background: colorBgContainer,
                    borderRadius: 10,
               }}
               className="header"
          >
               <div>v.1.0</div>
          </Header>
     );
}
