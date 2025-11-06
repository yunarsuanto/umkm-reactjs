import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralRoleDataState, GeneralRoleState } from "../types/admin/role/GeneralRoleTypes";

const initialState: GeneralRoleState = {
    openShow: false,
    openCreate: false,
    openUpdate: false,
    openDelete: false,
    selectedRole: {
        id: '',
        name: ''
    },
};

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        openShowModal: (state) => {
            state.openShow = true;
        },
        closeShowModal: (state) => {
            state.openShow = false;
            clearDataRole();
        },
        openCreateModal: (state) => {
            state.openCreate = true;
        },
        closeCreateModal: (state) => {
            state.openCreate = false;
            clearDataRole();
        },
        openUpdateModal: (state) => {
            state.openUpdate = true;
        },
        closeUpdateModal: (state) => {
            state.openUpdate = false;
            clearDataRole();
        },
        openDeleteModal: (state) => {
            state.openDelete = true;
        },
        closeDeleteModal: (state) => {
            state.openDelete = false;
            clearDataRole();
        },
        setDataRole: (state, action: PayloadAction<GeneralRoleDataState>) => {
           state.selectedRole = action.payload
        },
        clearDataRole: (state) => {
            state.selectedRole = { id: '', name: '' };
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
                setDataRole,
                clearDataRole,
            } = roleSlice.actions;
export default roleSlice.reducer;