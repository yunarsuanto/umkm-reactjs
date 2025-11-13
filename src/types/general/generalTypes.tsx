import { Meta } from "../Meta"

export interface GeneralState {
    mode: 'public' | 'user' | 'admin' | 'auth'
    loading: boolean
    open: string
    switchToAddDetail: boolean
    search: string
    isExtraSmall: boolean
    isSmall: boolean
    isMedium: boolean
    isLarge: boolean
    isDesktop: boolean
    isExtraLarge: boolean
    progressBar: number
    errorFileNull: string
    playVideo: boolean
}

export interface UploadFileResponse {
    meta: Meta
    data: UploadFileDataResponse
}

export interface UploadFileDataResponse {
    url: string
    path: string
    mimeType: string
    size: number
}