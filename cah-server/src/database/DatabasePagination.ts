import { Op, WhereOptions } from "sequelize";

export type PaginatedRequestProps<T> = {
    limit?: number;
    offset?: number;
    orderby?: ([keyof T, 'ASC' | 'DESC' | 'NULLS FIRST'])[];
}

export class PaginatedRequestOptions<T> {
    declare limit?: number;
    declare offset?: number;
    declare orderBy?: ([keyof T, 'ASC' | 'DESC' | 'NULLS FIRST'])[];

    constructor(obj: PaginatedRequestProps<T>) {
        Object.assign(this, obj);
    }
}