
export interface GeneralLessonState {
    openDelete: boolean;
    selectedLesson: GeneralLessonDataState;
    imageBase64: string;
    showMediaModal: boolean;
}

export interface GeneralLessonDataState {
    id: string;
    title: string;
}