
export interface GeneralPermissionState {
    openShow: boolean;
    openCreate: boolean;
    openUpdate: boolean;
    openDelete: boolean;
    selectedPermission: GeneralPermissionDataState
}

export interface GeneralPermissionDataState {
    id: string;
    name: string;
}