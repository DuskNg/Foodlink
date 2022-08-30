import { User } from "./../models/user";
import axiosClient from "./axiosClient";

export interface Params {
  email: string;
  password: string;
}
const authApi = {
  postLogin(params: Params): Promise<User> {
    return axiosClient.post("/users/login", params);
  },
  postRegister(data: User): Promise<User> {
    return axiosClient.post("/users", data);
  },
};
export default authApi;
