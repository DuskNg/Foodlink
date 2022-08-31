import { useState } from "react";
import { Button, Card, Form, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import authApi from "../../../api/authApi";
import { useAppDispatch } from "../../../app/hooks";

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError("Password is not match");
      setPassword("");
      setConfirmPassword("");
    } else {
      const userId = v4();
      const userData = {
        id: userId,
        firstName,
        lastName,
        email,
        role,
        password,
        status: "Active",
      };
      try {
        await authApi.postRegister(userData);
      } catch (error) {}
    }
  };
  return (
    <>
      <Card style={{ width: "500px" }} className="mx-auto mt-5">
        <Card.Body>
          <Card.Title className="d-flex justify-content-center">
            REGISTRATION
          </Card.Title>
          {error !== "" && (
            <Card.Text style={{ color: "red" }}>{error}</Card.Text>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="mb-2"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option>Select Role</option>
                <option value="Admin">Admin</option>
                <option value="System Admin">System Admin</option>
                <option value="Driver">Driver</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <NavDropdown.Divider />
          </Form>
          <div className="d-flex flex-row mt-3 justify-content-end">
            <div className="align-self-center">
              If you have an account, click here
            </div>
            <Link to="/login">
              <Button className="align-self-center mx-2">Login</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
