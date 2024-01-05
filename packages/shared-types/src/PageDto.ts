import { PageMeta } from "./PageMeta";

export class PageDto<T> {
    data: T[]
    meta: PageMeta;
}