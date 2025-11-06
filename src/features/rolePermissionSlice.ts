import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralRolePermissionState } from "../types/admin/role_permission/GeneralRolePermissionTypes";
import { AddRolePermissionDataState } from "../types/admin/role_permission/AddRolePermissionType";
import { DeleteRolePermissionDataState } from "../types/admin/role_permission/DeleteRolePermissionType";

const initialState: GeneralRolePermissionState = {
    selectedRolePermission: { role_id: '', permission_id: '' },
    selectedRolePermissionDelete: { role_id: '', permission_id: '' },
};

const roleSlice = createSlice({
    name: "role_permission",
    initialState,
    reducers: {
        setDataRolePermission: (state, action: PayloadAction<AddRolePermissionDataState>) => {
           state.selectedRolePermission = action.payload;
        },
        clearDataRolePermission: (state) => {
           state.selectedRolePermission = {role_id: '', permission_id: '' };
        },
        setDataRolePermissionDelete: (state, action: PayloadAction<DeleteRolePermissionDataState>) => {
           state.selectedRolePermissionDelete = action.payload;
        },
        clearDataRolePermissionDelete: (state) => {
           state.selectedRolePermissionDelete = {role_id: '', permission_id: '' };
        },
    },
});

export const { 
                setDataRolePermission,
                clearDataRolePermission,
                setDataRolePermissionDelete,
                clearDataRolePermissionDelete,
            } = roleSlice.actions;
export default roleSlice.reducer;