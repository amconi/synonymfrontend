import { Pager } from '@models/Pager';
export class ResponseGrid<T> {
    data: T[];
    isError: boolean;
    errorMessage?: string;
    pager: Pager;
}