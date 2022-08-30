import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { authActions } from "../../features/auth/authSlice";
import { User } from "../../models";

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const slug = useLocation();

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const size = Object.keys(user).length;

  if (slug.pathname === "/") {
    if (localStorage.getItem("accessToken") && localStorage.getItem("user")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/admin">FoodLink</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <NavDropdown
                title={
                  size !== 0 ? `${user.firstName} ${user.lastName}` : "Username"
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                {size !== 0 ? (
                  <NavDropdown.Item
                    href="/login"
                    onClick={() => dispatch(authActions.logout())}
                  >
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
