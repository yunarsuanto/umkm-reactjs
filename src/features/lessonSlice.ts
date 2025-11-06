import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralLessonDataState, GeneralLessonState } from "@/types/admin/lesson/GeneralLessonTypes";

const initialState: GeneralLessonState = {
    openDelete: false,
    selectedLesson: {
        id: '',
        title: '',
    },
    imageBase64: '',
    showMediaModal: false,
};

const lessonSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {
        openDeleteModal: (state) => {
            state.openDelete = true;
        },
        closeDeleteModal: (state) => {
            state.openDelete = false;
            clearDataLesson();
        },
        setDataLesson: (state, action: PayloadAction<GeneralLessonDataState>) => {
           state.selectedLesson = action.payload
        },
        clearDataLesson: (state) => {
            state.selectedLesson = { id: '', title: '' };
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
        setDataLesson,
        clearDataLesson,
        setImageBase64,
        setShowMediaModal,
    } = lessonSlice.actions;
export default lessonSlice.reducer;