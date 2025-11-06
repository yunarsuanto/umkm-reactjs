import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralPermissionDataState, GeneralPermissionState } from "../types/admin/permission/GeneralPermissionTypes";

const initialState: GeneralPermissionState = {
    openShow: false,
    openCreate: false,
    openUpdate: false,
    openDelete: false,
    selectedPermission: {
        id: '',
        name: ''
    },
};

const permissionSlice = createSlice({
    name: "permission",
    initialState,
    reducers: {
        openShowModal: (state) => {
            state.openShow = true;
        },
        closeShowModal: (state) => {
            state.openShow = false;
            clearDataPermission();
        },
        openCreateModal: (state) => {
            state.openCreate = true;
        },
        closeCreateModal: (state) => {
            state.openCreate = false;
            clearDataPermission();
        },
        openUpdateModal: (state) => {
            state.openUpdate = true;
        },
        closeUpdateModal: (state) => {
            state.openUpdate = false;
            clearDataPermission();
        },
        openDeleteModal: (state) => {
            state.openDelete = true;
        },
        closeDeleteModal: (state) => {
            state.openDelete = false;
            clearDataPermission();
        },
        setDataPermission: (state, action: PayloadAction<GeneralPermissionDataState>) => {
           state.selectedPermission = action.payload
        },
        clearDataPermission: (state) => {
            state.selectedPermission = { id: '', name: '' };
        }
    },
});

export const { 
                openShowModal,
                closeShowModal,
                openCreateModal,
                closeCreateModal,
                openUpdateModal,
                closeUpdateModal,
                openDeleteModal,
                closeDeleteModal,
                setDataPermission,
                clearDataPermission,
            } = permissionSlice.actions;
export default permissionSlice.reducer;