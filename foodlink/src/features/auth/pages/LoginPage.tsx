import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authActions, selectIsLoggedIn, selectMessage } from "../authSlice";

export interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginSuccess = useAppSelector(selectIsLoggedIn);
  const messageFailed = useAppSelector(selectMessage);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState(false);

  // If login successed, redirect to admin page
  useEffect(() => {
    if (loginSuccess) {
      navigate("/admin");
    }
  }, [loginSuccess]);

  // Error message
  useEffect(() => {
    if (messageFailed !== "") {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  }, [messageFailed]);

  //dispatch login action
  const loginSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(authActions.login(userData));
  };

  return (
    <>
      <Card style={{ width: "500px" }} className="mx-auto mt-5">
        <Card.Body>
          <Card.Title className="d-flex justify-content-center">
            LOGIN
          </Card.Title>
          {errorMessage && (
            <Card.Text style={{ color: "red" }}>{messageFailed}</Card.Text>
          )}
          <Form onSubmit={loginSubmitHandler}>
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <div className="d-flex flex-row mt-3 justify-content-end">
            <div className="align-self-center">
              You do not have an account? click here
            </div>
            <Link to="/register">
              <Button className="align-self-center mx-2">Register</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default LoginPage;
