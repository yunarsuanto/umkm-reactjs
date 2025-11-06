import { Meta } from "../../Meta";

export interface AddRolePermissionDataState {
    role_id: string;
    permission_id: string;
}

export interface AddRolePermissionResponse {
  meta: Meta
}