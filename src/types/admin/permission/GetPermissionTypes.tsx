import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetPermissionResponse {
  meta: Meta
  data: GetPermissionDataResponse[]
  pagination: Pagination
}

export interface GetPermissionDataResponse {
  id: string;
  name: string;
}