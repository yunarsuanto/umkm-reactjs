
export interface GeneralLessonItemState {
    openDelete: boolean;
    selectedLessonItem: GeneralLessonItemDataState;
    image: string;
    thumbnail: string;
    showMediaModal: boolean;
}

export interface GeneralLessonItemDataState {
    id: string;
    content: string;
}