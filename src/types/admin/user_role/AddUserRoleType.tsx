import { Meta } from "../../Meta";

export interface AddUserRoleDataState {
    user_id: string;
    role_id: string;
}

export interface AddUserRoleResponse {
  meta: Meta
}