import { AddPayload } from "../components/Layout/AddProduct";
import { UpdatePayload } from "./../components/Layout/VanDetail";
import { DeletePayload } from "../components/Layout/BodyContent";
import { Vans } from "./../models/vans";
import { ListResponse } from "./../models/common";
import axiosClient from "./axiosClient";

const vansApi = {
  getAll(): Promise<ListResponse<Vans>> {
    const url = "/vans";
    return axiosClient.get(url);
  },

  getById(id: string): Promise<Vans> {
    const url = `/vans/${id}`;
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    };
    return axiosClient.get(url, config);
  },

  add(data: AddPayload): Promise<Vans> {
    const url = "/vans";
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    };
    return axiosClient.post(url, data, config);
  },

  update(data: UpdatePayload): Promise<Vans> {
    const url = "/vans";
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    };
    return axiosClient.put(url, data, config);
  },

  delete(payload: DeletePayload): Promise<any> {
    const { id, token } = payload;
    const url = `/vans/${id}`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    return axiosClient.delete(url, config);
  },
};

export default vansApi;
