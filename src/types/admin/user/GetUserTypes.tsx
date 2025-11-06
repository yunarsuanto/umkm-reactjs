import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetUserResponse {
  meta: Meta
  data: GetUserDataResponse[]
  pagination: Pagination
}

export interface GetUserDataResponse {
  id: string;
  username: string;
  password: string;
  confirm_password: string;
}