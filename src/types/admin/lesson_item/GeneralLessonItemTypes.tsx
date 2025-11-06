
export interface GeneralLessonItemState {
    openDelete: boolean;
    selectedLessonItem: GeneralLessonItemDataState;
    imageBase64: string;
    showMediaModal: boolean;
}

export interface GeneralLessonItemDataState {
    id: string;
    content: string;
}