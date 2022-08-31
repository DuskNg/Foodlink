import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectVansMessage,
  selectVans,
  vanActions,
  selectDeleting,
} from "../../features/vans/vanSlice";
import { User, Vans } from "../../models";
import { Button, Card, Pagination, Space } from "antd";
import type { PaginationProps } from "antd";

export interface DeletePayload {
  id: string | undefined;
  token: string | undefined;
}

export const BodyContent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vanList: Vans[] = useAppSelector(selectVans);
  const vanMessage = useAppSelector(selectVansMessage);
  const isDeleted = useAppSelector(selectDeleting);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vansPerPage] = useState(10);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  // dispatch to get vans data
  useEffect(() => {
    dispatch(vanActions.getVans());
  }, [isDeleted]);

  // dispatch delete action
  const deleteHandler = (id?: string) => {
    const deletePayload: DeletePayload = {
      id,
      token: user.token,
    };
    dispatch(vanActions.deleteVan(deletePayload));
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // get current post
  const indexOfLastVan = currentPage * vansPerPage;
  const indexOfFirstVan = indexOfLastVan - vansPerPage;
  const currentVans = vanList.slice(indexOfFirstVan, indexOfLastVan);

  const onchangePagination: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    console.log("📢[BodyContent.tsx:55]: page: ", page);
  };
  return (
    <>
      <Link to="/admin/add">
        <Button style={{}}>Add new Van</Button>
      </Link>
      {showMessage && <p>{vanMessage}</p>}
      {vanList.length !== 0 &&
        currentVans.map((van, index) => (
          <Card style={{ marginTop: "5px" }} key={index}>
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {van.vanId}
              <Space>
                <Link to={`/admin/${van.id}`}>
                  <Button>Detail</Button>
                </Link>
                <Button
                  onClick={() => {
                    deleteHandler(van.id);
                  }}
                >
                  Delete
                </Button>
              </Space>
            </div>
          </Card>
        ))}
      <Pagination
        current={currentPage}
        onChange={onchangePagination}
        total={vanList.length}
      />
    </>
  );
};
