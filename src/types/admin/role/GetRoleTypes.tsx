import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetRoleResponse {
  meta: Meta
  data: GetRoleDataResponse[]
  pagination: Pagination
}

export interface GetRoleDataResponse {
  id: string;
  name: string;
}