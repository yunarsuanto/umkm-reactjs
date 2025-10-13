import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralPermissionDataState, GeneralPermissionState } from "../../types/admin/permission/GeneralPermissionTypes";

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
            clear();
        },
        openCreateModal: (state) => {
            state.openCreate = true;
        },
        closeCreateModal: (state) => {
            state.openCreate = false;
            clear();
        },
        openUpdateModal: (state) => {
            state.openUpdate = true;
        },
        closeUpdateModal: (state) => {
            state.openUpdate = false;
            clear();
        },
        openDeleteModal: (state) => {
            state.openDelete = true;
        },
        closeDeleteModal: (state) => {
            state.openDelete = false;
            clear();
        },
        setData: (state, action: PayloadAction<GeneralPermissionDataState>) => {
           state.selectedPermission = action.payload
        },
        clear: (state) => {
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
                setData,
                clear,
            } = permissionSlice.actions;
export default permissionSlice.reducer;