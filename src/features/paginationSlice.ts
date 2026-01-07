import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pagination } from "../types/Pagination";

const initialState: Pagination = {
    search: '',
    page: 0,
    limit: 0,
    prev: 0,
    next: 0,
    totalPages: 0,
    totalRecords: 0,
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setDataPagination: (state, action: PayloadAction<Partial<Pagination>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        setPaginationSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        clearPagination: (state) => {
            state = { 
                search: '',
                page: 0,
                limit: 0,
                prev: 0,
                next: 0,
                totalPages: 0,
                totalRecords: 0,
            };
        }
    }
})

export const { 
                setDataPagination,
                setPaginationSearch,
                clearPagination,
            } = paginationSlice.actions;
export default paginationSlice.reducer;