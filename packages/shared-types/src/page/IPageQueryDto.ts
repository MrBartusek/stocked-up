import { SortDirection } from "./SortDirection";

interface IPageQueryDto<T = any> {
    page?: number;
    pageSize?: number;
    orderBy?: keyof T;
    orderDirection?: SortDirection;
    search?: string;
}

export default IPageQueryDto;