import { PageMeta } from "./PageMeta";

export class PageDto<T> {
    items: T[]
    meta: PageMeta;
}