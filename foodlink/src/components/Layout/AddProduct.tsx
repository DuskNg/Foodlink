import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigation } from "./Navigation";
import { selectAdding, vanActions } from "../../features/vans/vanSlice";

export interface AddPayload {
  vanId: string;
  status: string;
}

export const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAdded = useAppSelector(selectAdding);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");

  // dispatch actions
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const payload: AddPayload = {
      vanId: name,
      status,
    };
    dispatch(vanActions.addVan(payload));
  };

  // navigate to admin if successful add
  useEffect(() => {
    if (isAdded) {
      navigate("/admin");
    }
  }, [isAdded]);

  return (
    <>
      <Navigation />
      <Card style={{ width: "500px" }} className="mx-auto mt-5">
        <Card.Body>
          <Card.Title className="d-flex justify-content-center">
            ADD NEW PRODUCT
          </Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="mb-2"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Add new product
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
