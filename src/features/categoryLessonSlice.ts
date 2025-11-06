import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralCategoryLessonDataState, GeneralCategoryLessonState } from "../types/admin/category_lesson/GeneralCategoryLessonTypes";

const initialState: GeneralCategoryLessonState = {
    openDelete: false,
    selectedCategoryLesson: {
        id: '',
        title: '',
    },
    imageBase64: '',
    showMediaModal: false,
};

const UserSlice = createSlice({
    name: "categoryLesson",
    initialState,
    reducers: {
        openDeleteModal: (state) => {
            state.openDelete = true;
        },
        closeDeleteModal: (state) => {
            state.openDelete = false;
            clearDataCategoryLesson();
        },
        setDataCategoryLesson: (state, action: PayloadAction<GeneralCategoryLessonDataState>) => {
           state.selectedCategoryLesson = action.payload
        },
        clearDataCategoryLesson: (state) => {
            state.selectedCategoryLesson = { id: '', title: '' };
        },
        setImageBase64: (state, action: PayloadAction<string>) => {
            state.imageBase64 = action.payload
        },
        setShowMediaModal: (state, action: PayloadAction<boolean>) => {
            state.showMediaModal = action.payload
        },
    },
});

export const { 
        openDeleteModal,
        closeDeleteModal,
        setDataCategoryLesson,
        clearDataCategoryLesson,
        setImageBase64,
        setShowMediaModal,
    } = UserSlice.actions;
export default UserSlice.reducer;