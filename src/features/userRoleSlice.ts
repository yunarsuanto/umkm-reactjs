import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralUserRoleState } from "../types/admin/user_role/GeneralUserRoleTypes";
import { AddUserRoleDataState } from "../types/admin/user_role/AddUserRoleType";
import { DeleteUserRoleDataState } from "../types/admin/user_role/DeleteUserRoleType";

const initialState: GeneralUserRoleState = {
    selectedUserRole: { user_id: '', role_id: '' },
    selectedUserRoleDelete: { user_id: '', role_id: '' },
};

const roleSlice = createSlice({
    name: "role_permission",
    initialState,
    reducers: {
        setDataUserRole: (state, action: PayloadAction<AddUserRoleDataState>) => {
           state.selectedUserRole = action.payload;
        },
        clearDataUserRole: (state) => {
           state.selectedUserRole = {user_id: '', role_id: '' };
        },
        setDataUserRoleDelete: (state, action: PayloadAction<DeleteUserRoleDataState>) => {
           state.selectedUserRoleDelete = action.payload;
        },
        clearDataUserRoleDelete: (state) => {
           state.selectedUserRoleDelete = {user_id: '', role_id: '' };
        },
    },
});

export const { 
                setDataUserRole,
                clearDataUserRole,
                setDataUserRoleDelete,
                clearDataUserRoleDelete,
            } = roleSlice.actions;
export default roleSlice.reducer;