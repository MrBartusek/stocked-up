import { SortDirection } from "./SortDirection";

export interface IPageQueryDto<T = any> {
    page?: number;
    pageSize?: number;
    orderBy?: keyof T;
    orderDirection?: SortDirection;
    search?: string;
}
