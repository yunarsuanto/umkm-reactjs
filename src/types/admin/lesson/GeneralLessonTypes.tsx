
export interface GeneralLessonState {
    openDelete: boolean;
    openCopy: boolean;
    selectedLesson: GeneralLessonDataState;
    imageBase64: string;
    showMediaModal: boolean;
}

export interface GeneralLessonDataState {
    id: string;
    title: string;
    level: number;
}