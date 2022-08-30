import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Button,
  Modal,
  Form,
  NavDropdown,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectUpdating,
  selectVan,
  selectVansMessage,
  vanActions,
} from "../../features/vans/vanSlice";
import { Navigation } from "./Navigation";

export interface UpdatePayload {
  vanId: string | undefined;
  status: string | undefined;
  id: string | undefined;
}

export const VanDetail = () => {
  const dispatch = useAppDispatch();
  const isUpdated = useAppSelector(selectUpdating);
  const updateMessage = useAppSelector(selectVansMessage);
  const van = useAppSelector(selectVan);

  const slug = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  const [id, setId] = useState<string | undefined>("");

  // dispatch: get van by id
  useEffect(() => {
    const vanId = slug.pathname.split("/admin/")[1];
    dispatch(vanActions.getVanById(vanId));
  }, [isUpdated]);

  // dispatch update action
  const updateHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const payload: UpdatePayload = {
      id,
      vanId: name,
      status,
    };
    dispatch(vanActions.updateVan(payload));
    setShowModal(false);
  };

  //set state to modal
  useEffect(() => {
    setName(van.vanId);
    setId(van.id);
    setStatus(van.status);
  }, [van]);

  return (
    <>
      <Navigation />
      {van && (
        <div>
          <Container>
            <Card style={{ width: "500px" }} className="mx-auto mt-3">
              {updateMessage && <Card.Text>{updateMessage}</Card.Text>}
              <Card.Title className="mx-auto mt-2">Product Detail</Card.Title>
              <Card.Body className="d-flex flex-column">
                <Card.Text>Name: {van.vanId}</Card.Text>
                <Card.Text>Status: {van.status}</Card.Text>
                <Button onClick={() => setShowModal(true)}>Update</Button>
              </Card.Body>
            </Card>
          </Container>

          <Modal show={showModal}>
            <Modal.Header>
              <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={updateHandler}>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Confirm
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};
