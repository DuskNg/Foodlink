// import { Container, Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { authActions } from "../../features/auth/authSlice";
import { User } from "../../models";
import { Menu, Dropdown, Button, Layout } from "antd";

const { Header } = Layout;

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="#">Profile</Link>,
        },
        {
          key: "2",
          label: <Button onClick={handleLogout}>Logout</Button>,
        },
      ]}
    />
  );
  return (
    <>
      <Header
        className="header"
        style={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <Dropdown overlay={menu} placement="bottom">
          <Button>{`${user.firstName} ${user.lastName}`}</Button>
        </Dropdown>
      </Header>
    </>
  );
};
