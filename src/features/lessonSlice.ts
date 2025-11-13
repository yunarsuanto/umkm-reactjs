import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralLessonDataState, GeneralLessonState } from "@/types/admin/lesson/GeneralLessonTypes";

const initialState: GeneralLessonState = {
    openDelete: false,
    openCopy: false,
    selectedLesson: {
        id: '',
        title: '',
        level: 0,
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
        setCopyModal: (state, action) => {
            state.openCopy = action.payload
        },
        setDataLesson: (state, action: PayloadAction<GeneralLessonDataState>) => {
           state.selectedLesson = action.payload
        },
        clearDataLesson: (state) => {
            state.selectedLesson = { id: '', title: '', level: 0 };
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
        setCopyModal,
    } = lessonSlice.actions;
export default lessonSlice.reducer;