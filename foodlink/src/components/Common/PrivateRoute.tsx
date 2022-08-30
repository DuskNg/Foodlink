import React from "react";
import { Button, Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  if (!isLoggedIn) {
    return (
      <Container>
        <div className="d-flex flex-column align-items-center">
          <h1>You are not allowed to access this page!</h1>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Please login!
          </Button>
        </div>
      </Container>
    );
  }
  return <Outlet />;
};
