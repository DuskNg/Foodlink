import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { items2 } from "./Admin";

export const Dashboard = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items2}
    />
  );
};
