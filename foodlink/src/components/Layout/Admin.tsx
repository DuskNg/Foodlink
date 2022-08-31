// import { Container, Row, Col } from "react-bootstrap";
import { BodyContent } from "./BodyContent";
// import { Dashboard } from "./Dashboard";
// import { Navigation } from "./Navigation";

// export const AdminLayout = () => {
//   return (
//     <>
//       <Navigation />
//       <Container>
//         <Row className="mt-3">
//           <Col md={3}>
//             <Dashboard />
//           </Col>
//           <Col md={9}>
//             <Content />
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Navigation } from "./Navigation";
import { Dashboard } from "./Dashboard";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

export const items2: MenuProps["items"] = [UserOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: "Dashboard",

    children: new Array(1).fill(null).map((_, j) => {
      const subKey = index * 1 + j + 1;
      return {
        key: subKey,
        label: "Vans",
      };
    }),
  };
});

export const AdminLayout: React.FC = () => (
  <Layout>
    <Navigation />
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Dashboard />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <BodyContent />
        </Content>
      </Layout>
    </Layout>
  </Layout>
);
