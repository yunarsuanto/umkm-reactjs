import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralState } from "../types/general/generalTypes";
import { useMediaQuery } from "@mantine/hooks";

const initialState: GeneralState = {
    mode: 'public',
    loading: false,
    open: '',
    switchToAddDetail: false,
    search: '',
    isExtraSmall: false,
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isDesktop: false,
    isExtraLarge: false,
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
        setResponsive: (state, action) => {
            const { isExtraSmall, isSmall, isMedium, isLarge, isDesktop, isExtraLarge } = action.payload;
            state.isExtraSmall = isExtraSmall;
            state.isSmall = isSmall;
            state.isMedium = isMedium;
            state.isLarge = isLarge;
            state.isDesktop = isDesktop;
            state.isExtraLarge = isExtraLarge;
        },
    },
})

export const { 
        setMode,
        setLoading,
        setOpen,
        changeSwitchToAddDetail,
        setSearch,
        setResponsive,
    } = generalSlice.actions;
export default generalSlice.reducer;