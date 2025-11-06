
export interface GeneralUserState {
    openShow: boolean;
    openCreate: boolean;
    openUpdate: boolean;
    openDelete: boolean;
    selectedUser: GeneralUserDataState
}

export interface GeneralUserDataState {
    id: string;
    username: string;
}