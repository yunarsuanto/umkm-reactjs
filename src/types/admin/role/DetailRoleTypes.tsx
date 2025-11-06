import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface DetailRoleResponse {
  meta: Meta
  data: DetailRoleDataResponse
}

export interface DetailRoleDataResponse {
  id: string;
  name: string;
  permissions: DetailRoleDataPermissionResponse[]
}

export interface DetailRoleDataPermissionResponse {
  id: string;
  name: string;
}
