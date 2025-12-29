import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralState } from "../types/general/generalTypes";

const initialState: GeneralState = {
    mode: 'public',
    loading: false,
    open: '',
    switchToAddDetail: false,
    search: '',
    progressBar: 0,
    errorFileNull: '',
    playVideoKamuHebat: false,
    playVideoUhSalah: false,
    loadedImages: [],
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setMode(state, action) {
            state.mode = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setOpen(state, action) {
            state.open = action.payload;
        },
        changeSwitchToAddDetail: (state) => {
            state.switchToAddDetail ? state.switchToAddDetail = false : state.switchToAddDetail = true
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setProgressBar: (state, action: PayloadAction<number>) => {
            state.progressBar = action.payload
        },
        setErrorFileNull: (state, action: PayloadAction<string>) => {
            state.errorFileNull = action.payload
        },
        setPlayVideoKamuHebat: (state, action: PayloadAction<boolean>) => {
            state.playVideoKamuHebat = action.payload
        },
        setPlayVideoUhSalah: (state, action: PayloadAction<boolean>) => {
            state.playVideoUhSalah = action.payload
        },
        setLoadedImages: (state, action: PayloadAction<boolean[]>) => {
            state.loadedImages = action.payload
        },
    },
})

export const { 
        setMode,
        setLoading,
        setOpen,
        changeSwitchToAddDetail,
        setSearch,
        setProgressBar,
        setErrorFileNull,
        setPlayVideoKamuHebat,
        setPlayVideoUhSalah,
        setLoadedImages,
    } = generalSlice.actions;
export default generalSlice.reducer;