import { Button, Card, Typography, Form, Input, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authActions, selectIsLoggedIn, selectMessage } from "../authSlice";
const { Title } = Typography;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState(false);
  const messageFailed = useAppSelector(selectMessage);
  const loginSuccess = useAppSelector(selectIsLoggedIn);

  const onFinish = (values: any) => {
    dispatch(authActions.login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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

  return (
    <Card
      style={{
        width: 400,
        margin: "auto",
        marginTop: 75,
      }}
    >
      <Title
        level={3}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Login
      </Title>
      <Divider style={{ marginTop: 10 }} />
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {errorMessage && <p style={{ color: "red" }}>{messageFailed}</p>}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
