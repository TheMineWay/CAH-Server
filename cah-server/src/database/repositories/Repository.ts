import { FindOptions, Transaction } from "sequelize";
import { databaseQueryException } from "src/errors/errors";
import { DatabaseState } from "../DatabaseConnection";
import { PaginatedRequestOptions, PaginatedRequestProps } from "../DatabasePagination";
import generateNewTransaction from "./Transaction";

export type RepositoryOptions = {
    transaction?: Transaction | null;
};

export type RepositoryQueryOptions<T> = {
    includeAll?: boolean;
    includePagination?: PaginatedRequestOptions<T>;
}

export function repositoryException(e: any) {
    databaseQueryException(e);
}

/**
 * T = Attributes (ex, UserAttributes)
 * K = Create attributes (ex, UserCreateAttributes)
 */
export default abstract class Repository<T, K> {

    private transaction?: Transaction | null;

    protected constructor(options: { transaction?: Transaction }) {
        this.transaction = options.transaction;
    }

    public async getTransaction() {
        if(this.transaction === undefined) await this.newTransaction({});
        return this.transaction;
    }

    public async newTransaction(options: {
        rollback?: boolean,
    }) {

        // Rollback if necessary

        if(options.rollback) {
            await this.rollback();
        } else {
            await this.commit();
        }

        this.transaction = await Repository.newTransaction();
    }

    public static async newTransaction() {
        return await generateNewTransaction(DatabaseState.sequelize);
    }
    
    public async commit() {
        if(!this.transaction) return;
        await (await this.getTransaction()).commit();
    }

    public async rollback() {
        if(!this.transaction) return;
        await (await this.getTransaction()).rollback();
    }

    // Pagination

    protected async getPaginatedRequestOps(options: PaginatedRequestProps<T>): Promise<FindOptions<T>> {

        const paginatedOptions = new PaginatedRequestOptions<T>(options);

        return {
            transaction: await this.getTransaction(),
            where: paginatedOptions.where(),
            limit: paginatedOptions.limit,
            offset: paginatedOptions.offset,
            order: paginatedOptions.orderBy as [string, 'ASC' | 'DESC' | 'NULLS FIRST'][],
        };
    }

    protected async opts(options: RepositoryQueryOptions<T>): Promise<FindOptions<T>> {
        return {
            ...(await this.getPaginatedRequestOps(options.includePagination)),
        };
    }
}