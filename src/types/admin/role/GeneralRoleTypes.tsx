
export interface GeneralRoleState {
    openShow: boolean;
    openCreate: boolean;
    openUpdate: boolean;
    openDelete: boolean;
    selectedRole: GeneralRoleDataState
}

export interface GeneralRoleDataState {
    id: string;
    name: string;
}