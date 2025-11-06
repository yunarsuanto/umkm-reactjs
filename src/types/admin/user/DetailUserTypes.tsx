import { Meta } from "../../Meta";

export interface DetailUserResponse {
  meta: Meta
  data: DetailUserDataResponse
}

export interface DetailUserDataResponse {
  id: string;
  username: string;
  is_active: boolean;
  roles: DetailUserDataRoleResponse[]
}

export interface DetailUserDataRoleResponse {
  id: string;
  name: string;
  is_active: boolean;
  permissions: DetailUserDataPermissionResponse[]
}

export interface DetailUserDataPermissionResponse {
  id: string;
  name: string;
}
