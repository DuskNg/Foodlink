import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectVansMessage,
  selectVans,
  vanActions,
  selectDeleting,
} from "../../features/vans/vanSlice";
import { User, Vans } from "../../models";

export interface DeletePayload {
  id: string | undefined;
  token: string | undefined;
}

export const Content = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vanList: Vans[] = useAppSelector(selectVans);
  const vanMessage = useAppSelector(selectVansMessage);
  const isDeleted = useAppSelector(selectDeleting);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  // dispatch to get vans data
  useEffect(() => {
    dispatch(vanActions.getVans());
  }, [isDeleted]);

  // dispatch delete action
  const deleteHandler = (id: string | undefined) => {
    //handle authentication
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    //dispatch action
    else {
      const deletePayload: DeletePayload = {
        id,
        token: user.token,
      };
      dispatch(vanActions.deleteVan(deletePayload));
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          {showMessage && <Card.Text>{vanMessage}</Card.Text>}
          {vanList.length !== 0 &&
            vanList.map((van, index) => (
              <Card key={index} className="mt-2">
                <Card.Body className="d-flex flex-row justify-content-between">
                  <Card.Title>{van.vanId}</Card.Title>
                  <div>
                    <Link to={`/admin/${van.id}`}>
                      <Button className="mx-3">Detail</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        deleteHandler(van.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </Card.Body>
      </Card>
    </>
  );
};
