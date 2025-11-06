import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralLessonItemDataState, GeneralLessonItemState } from "@/types/admin/lesson_item/GeneralLessonItemTypes";

const initialState: GeneralLessonItemState = {
    openDelete: false,
    selectedLessonItem: {
        id: '',
        content: '',
    },
    imageBase64: '',
    showMediaModal: false,
};

const lessonSlice = createSlice({
    name: "lessonItem",
    initialState,
    reducers: {
        openDeleteModal: (state) => {
            state.openDelete = true;
        },
        closeDeleteModal: (state) => {
            state.openDelete = false;
            clearDataLessonItem();
        },
        setDataLessonItem: (state, action: PayloadAction<GeneralLessonItemDataState>) => {
           state.selectedLessonItem = action.payload
        },
        clearDataLessonItem: (state) => {
            state.selectedLessonItem = { id: '', content: '' };
        },
    },
});

export const { 
        openDeleteModal,
        closeDeleteModal,
        setDataLessonItem,
        clearDataLessonItem,
    } = lessonSlice.actions;
export default lessonSlice.reducer;