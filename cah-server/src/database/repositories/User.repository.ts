import { PaginatedRequestProps } from "../DatabasePagination";
import { UserAttributes, UserCreateAttributes, UserDefinition, UserUpdateAttributes } from "../definitions/User.definition";
import Repository, { repositoryException, RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class UserRepository extends Repository<UserAttributes, UserCreateAttributes> {

    public constructor(options: RepositoryOptions) {
        super(options);
    }

    async getAll(options?: RepositoryQueryOptions<UserAttributes>) {
        try {
            return UserDefinition.findAll({
                ...await this.opts(options),
            });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async getAllPaginated(pagination: PaginatedRequestProps<UserAttributes>) {
        try {
            return UserDefinition.findAll(
                await this.getPaginatedRequestOps(pagination),
            );
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async getById(id: string, options?: RepositoryQueryOptions<UserAttributes>) {
        try {
            return UserDefinition.findByPk(id, {
                ...await this.opts(options),
            });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async getAdminById(id: string, options?: RepositoryQueryOptions<UserAttributes>) {
        try {
            return await UserDefinition.findOne({
                where: {
                    id,
                    isAdmin: true,
                },
                ...await this.opts(options),
            });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async getByLogin(login: string, options?: RepositoryQueryOptions<UserAttributes>) {
        try {
            return UserDefinition.findOne({
                where: {
                    login,
                },
                ...await this.opts(options),
            });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async create(user: UserCreateAttributes) {
        try {
            return await UserDefinition.create(user, {
                transaction: await this.getTransaction(),
            });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async update(id: string, user: UserUpdateAttributes) {
        try {
            return await UserDefinition.update(user, {
                where: {
                    id,
                },
                transaction: await this.getTransaction(),
            });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async delete(id: string) {
        try {
            return await UserDefinition.destroy({
                where: {
                    id,
                },
                transaction: await this.getTransaction(),
            });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }

    async changeRole(userId: string, roles: { isAdmin?: boolean }) {
        try {
            return await UserDefinition.update({
                isAdmin: roles.isAdmin,
            },
                {
                    where: {
                        id: userId,
                    },
                    transaction: await this.getTransaction(),
                });
        } catch (e: any) {
            await this.rollback();
            repositoryException(e);
        }
    }
}