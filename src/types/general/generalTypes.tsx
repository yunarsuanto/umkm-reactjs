import { Meta } from "../Meta"

export interface GeneralState {
    mode: 'public' | 'user' | 'admin' | 'auth'
    loading: boolean
    open: string
    switchToAddDetail: boolean
    search: string
    progressBar: number
    errorFileNull: string
    playVideoKamuHebat: boolean
    playVideoUhSalah: boolean
    playVideoAyo: boolean
    playVideoKemon: boolean
    playVideoGabung: boolean
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