import React, { useEffect, useState } from "react";
// import { Button, Card, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAdding,
  selectVansMessage,
  vanActions,
} from "../../features/vans/vanSlice";
import { Button, Modal, Form, Input, Select, Typography } from "antd";
const { Option } = Select;
const { Title } = Typography;

export interface AddPayload {
  vanId: string;
  status: string;
}
export const AddProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const vanMessage = useAppSelector(selectVansMessage);
  const isAdded = useAppSelector(selectAdding);
  const [visible, setVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState("");

  // dispatch actions
  const submitHandler = (value: AddPayload) => {
    dispatch(vanActions.addVan(value));
  };

  useEffect(() => {
    dispatch(vanActions.getVans());
  }, [isAdded]);

  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, [vanMessage]);

  const showModal = () => {
    setVisible(true);
    setName("");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new van
      </Button>
      <Modal
        visible={visible}
        title="Add new product"
        footer={null}
        closable={false}
      >
        {showMessage && (
          <Title level={5} type="danger">
            {vanMessage}
          </Title>
        )}
        <Form onFinish={submitHandler}>
          <Form.Item
            label="Name"
            name="vanId"
            rules={[{ required: true, message: "Please input your Van name!" }]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your username!" }]}
            initialValue="Active"
          >
            <Select style={{ width: 150 }}>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "20px",
            }}
          >
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
