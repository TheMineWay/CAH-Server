import { FindOptions, Includeable, Model, ModelStatic, Order, Transaction, WhereOptions } from "sequelize";
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

export type SequelizeQueryOptions = {
    transaction: Transaction;
}

/**
 * T = Attributes (ex, UserAttributes)
 * K = Create attributes (ex, UserCreateAttributes)
 */
export default abstract class Repository<T, K, M extends Model> {

    private transaction?: Transaction | null;

    protected constructor(options: { transaction?: Transaction }) {
        this.transaction = options.transaction;
    }

    public async getTransaction() {
        if (this.transaction === undefined) await this.newTransaction({});
        return this.transaction;
    }

    public async newTransaction(options: {
        rollback?: boolean,
    }) {

        // Rollback if necessary

        if (options.rollback) {
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
        if (!this.transaction) return;
        await (await this.getTransaction()).commit();
    }

    public async rollback() {
        if (!this.transaction) return;
        await (await this.getTransaction()).rollback();
    }

    // Pagination

    protected async getPaginatedRequestOps(options: PaginatedRequestProps<T>): Promise<{
        limit?: number;
        offset?: number;
        order?: [string, 'ASC' | 'DESC' | 'NULLS FIRST'][];
    }> {

        const paginatedOptions = new PaginatedRequestOptions<T>(options);

        return {
            limit: paginatedOptions.limit,
            offset: paginatedOptions.offset,
            order: paginatedOptions.orderBy as [string, 'ASC' | 'DESC' | 'NULLS FIRST'][],
        };
    }

    protected async opts(options?: RepositoryQueryOptions<T>): Promise<{
        include?: Includeable;
        limit?: number;
        offset?: number;
        order?: Order;
    }> {
        if (!options) return {};

        return {
            include: {
                all: options.includeAll ? true : undefined,
            },
            ...(await this.getPaginatedRequestOps(options.includePagination)),
        };
    }

    protected async secureContext<T>(func: (o: SequelizeQueryOptions) => Promise<T>, opts?: {
        autoCommit?: boolean;
    }): Promise<T> {
        try {
            const result = await func({
                transaction: await this.getTransaction(),
            });

            // Hardly used, but it might be useful some day
            if (opts?.autoCommit) await this.commit();

            return result;
        } catch (e: any) {
            await this.rollback();
            databaseQueryException(e);
        }
    }
}