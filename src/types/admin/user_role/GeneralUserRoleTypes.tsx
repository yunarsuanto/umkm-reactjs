import { AddUserRoleDataState } from "./AddUserRoleType";
import { DeleteUserRoleDataState } from "./DeleteUserRoleType";

export interface GeneralUserRoleState {
    selectedUserRole: AddUserRoleDataState
    selectedUserRoleDelete: DeleteUserRoleDataState
}