
export interface GeneralCategoryLessonState {
    openDelete: boolean;
    selectedCategoryLesson: GeneralCategoryLessonDataState;
    imageBase64: string;
    showMediaModal: boolean;
}

export interface GeneralCategoryLessonDataState {
    id: string;
    title: string;
}