import { Meta } from "../../Meta";

export interface DeleteUserRoleDataState {
    user_id: string;
    role_id: string;
}

export interface DeleteUserRoleResponse {
  meta: Meta
}