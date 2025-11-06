import { Meta } from "../../Meta";

export interface DeleteRolePermissionDataState {
    role_id: string;
    permission_id: string;
}

export interface DeleteRolePermissionResponse {
  meta: Meta
}