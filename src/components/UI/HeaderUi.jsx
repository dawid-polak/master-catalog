import { Layout, theme, Button, Tooltip, Modal, Alert } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Header } = Layout;

import "../../assets/scss/UI/Header.scss";

export default function HeaderUi() {
     const {
          token: { colorBgContainer },
     } = theme.useToken();

     const infoModal = () => {
          Modal.info({
               title: "Wyjaśnie widoku",
               content: (
                    <div>
                         {/* <Alert
                              type="info"
                              message="Jesteś na stronie głównej. W miarę rozwoju aplikacji będą pojawiać się tutaj dodatkowe widgets. Póki co znajdziesz tutaj widget: Wyszukaj apliakcje. Ma on na celu wyszukanie cześci na podstawie Marki Modelu i Silnika. Wszystkie dane  są odzwiercedleniem bazdy danych. Jeśli tutaj czegoś brakuje to znaczy, ze w bazie równiez."
                         />
                         <Alert
                              style={{ margin: "10px 0px" }}
                              type="warning"
                              message="Uwaga! W widget 'Wyszukaj Aplikacje' selecty zwracają wszystkie mozliwe opcje oprócz wartości null"
                         /> */}
                    </div>
               ),
          });
     };

     return (
          <Header
               style={{
                    background: colorBgContainer,
                    borderRadius: 10,
               }}
               className="header"
          >
               <Tooltip
                    placement="bottomLeft"
                    title="Jak się poruszać po tym widoku?"
                    color="blue"
               >
                    <Button
                         icon={<QuestionCircleOutlined />}
                         type="link"
                         onClick={() => infoModal()}
                    ></Button>
               </Tooltip>

               <div>v.1.0</div>
          </Header>
     );
}
