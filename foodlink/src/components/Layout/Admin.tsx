import { Container, Row, Col } from "react-bootstrap";
import { Content } from "./Content";
import { Dashboard } from "./Dashboard";
import { Navigation } from "./Navigation";

export const AdminLayout = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Row className="mt-3">
          <Col md={3}>
            <Dashboard />
          </Col>
          <Col md={9}>
            <Content />
          </Col>
        </Row>
      </Container>
    </>
  );
};
