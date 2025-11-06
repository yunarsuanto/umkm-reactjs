export interface Pagination {
    search: string
    page: number
    limit: number
    prev: number
    next: number
    totalPages: number
    totalRecords: number
}