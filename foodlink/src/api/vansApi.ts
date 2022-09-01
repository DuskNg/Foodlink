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
    return axiosClient.get(url);
  },

  add(data: AddPayload): Promise<Vans> {
    const url = "/vans";
    return axiosClient.post(url, data);
  },

  update(data: UpdatePayload): Promise<Vans> {
    const url = "/vans";
    return axiosClient.put(url, data);
  },

  delete(payload: DeletePayload): Promise<any> {
    const { id } = payload;
    const url = `/vans/${id}`;
    return axiosClient.delete(url);
  },
};

export default vansApi;
