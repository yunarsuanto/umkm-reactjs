import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pagination } from "../../types/Pagination";

const initialState: Pagination = {
    page: 0,
    limit: 0,
    prev: 0,
    next: 0,
    total_pages: 0,
    total_records: 0,
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Pagination>) => {
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.prev = action.payload.prev;
            state.next = action.payload.next;
            state.total_pages = action.payload.total_pages;
            state.total_records = action.payload.total_records;
        },
        clear: (state) => {
            state = { 
                page: 0,
                limit: 0,
                prev: 0,
                next: 0,
                total_pages: 0,
                total_records: 0,
            };
        }
    }
})

export const { 
                setData,
                clear,
            } = paginationSlice.actions;
export default paginationSlice.reducer;