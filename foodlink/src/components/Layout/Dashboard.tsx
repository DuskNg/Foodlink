import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Dashboard</Card.Title>
          <Link to="/admin/add">
            <Button>Add new product</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};
