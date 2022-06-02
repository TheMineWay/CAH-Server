import { Op, WhereOptions } from "sequelize";

export type PaginatedRequestProps<T> = {
    limit?: number;
    offset?: number;
    orderby?: ([keyof T, 'ASC' | 'DESC' | 'NULLS FIRST'])[];
    filters?: PaginatedRequestFilter<T>[];
}

export class PaginatedRequestOptions<T> {
    declare limit?: number;
    declare offset?: number;
    declare orderBy?: ([keyof T, 'ASC' | 'DESC' | 'NULLS FIRST'])[];
    declare filters?: PaginatedRequestFilter<T>[];

    constructor(obj: PaginatedRequestProps<T>) {
        Object.assign(this, obj);
    }

    where() {
        const where = {};

        for(const v of this.filters) {
            where[v.field as string] = Array.isArray(v.value) ? {
                [Op.in]: v.value
            } : v.value;
        }

        return where;
    }
}

export type PaginatedRequestFilter<T> = {
    field: keyof T;
    value: number[] | number | string | string[] | boolean | boolean[] | Date | Date[] | null;
}