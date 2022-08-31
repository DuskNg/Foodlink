import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { authActions } from "../../features/auth/authSlice";
import { User } from "../../models";

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/admin">FoodLink</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <NavDropdown
                title={`${user.firstName} ${user.lastName}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="/"
                  onClick={() => dispatch(authActions.logout())}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
