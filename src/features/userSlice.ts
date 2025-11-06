import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralUserDataState, GeneralUserState } from "../types/admin/user/GeneralUserTypes";

const initialState: GeneralUserState = {
    openShow: false,
    openCreate: false,
    openUpdate: false,
    openDelete: false,
    selectedUser: {
        id: '',
        username: '',
    },
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        openShowModal: (state) => {
            state.openShow = true;
        },
        closeShowModal: (state) => {
            state.openShow = false;
            clearDataUser();
        },
        openCreateModal: (state) => {
            state.openCreate = true;
        },
        closeCreateModal: (state) => {
            state.openCreate = false;
            clearDataUser();
        },
        openUpdateModal: (state) => {
            state.openUpdate = true;
        },
        closeUpdateModal: (state) => {
            state.openUpdate = false;
            clearDataUser();
        },
        openDeleteModal: (state) => {
            state.openDelete = true;
        },
        closeDeleteModal: (state) => {
            state.openDelete = false;
            clearDataUser();
        },
        setDataUser: (state, action: PayloadAction<GeneralUserDataState>) => {
           state.selectedUser = action.payload
        },
        clearDataUser: (state) => {
            state.selectedUser = { id: '', username: '' };
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
                setDataUser,
                clearDataUser,
            } = UserSlice.actions;
export default UserSlice.reducer;