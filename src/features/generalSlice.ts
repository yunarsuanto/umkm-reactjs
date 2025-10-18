import { createSlice } from "@reduxjs/toolkit";
import { GeneralState } from "../types/general/generalTypes";

const initialState: GeneralState = {
    mode: 'public',
    loading: false,
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
        }
    },
})

export const { 
        setMode,
        setLoading,
    } = generalSlice.actions;
export default generalSlice.reducer;