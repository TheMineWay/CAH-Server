import { PaginatedRequestProps } from "../DatabasePagination";
import { UserAttributes, UserCreateAttributes, UserDefinition, UserUpdateAttributes } from "../definitions/User.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class UserRepository extends Repository<UserAttributes, UserCreateAttributes, UserDefinition> {

    public constructor(options: RepositoryOptions) {
        super(options);
    }

    async getAll(options?: RepositoryQueryOptions<UserAttributes>) {
        return await this.secureContext(async (o) => {
            return UserDefinition.findAll({
                ...await this.opts(options),
                ...o,
            });
        });
    }

    async getAllPaginated(pagination: PaginatedRequestProps<UserAttributes>) {
        return await this.secureContext(async (o) => {
            return UserDefinition.findAll({
                ...await this.getPaginatedRequestOps(pagination),
                ...o,
            });
        });
    }

    async getById(id: string, options?: RepositoryQueryOptions<UserAttributes>) {
        return await this.secureContext(async (o) => {
            return UserDefinition.findByPk(id, {
                ...await this.opts(options),
                ...o,
            });
        });
    }

    async getAdminById(id: string, options?: RepositoryQueryOptions<UserAttributes>) {
        return await this.secureContext(async (o) => {
            return await UserDefinition.findOne({
                where: {
                    id,
                    isAdmin: true,
                },
                ...o,
                ...await this.opts(options),
            });
        });
    }

    async setAdminById(id: string, isAdmin: boolean) {
        return await this.secureContext(async (o) => {
            return await UserDefinition.update({
                isAdmin,
            }, {
                where: {
                    id,
                },
                ...o,
            });
        });
    }

    async getByLogin(login: string, options?: RepositoryQueryOptions<UserAttributes>) {
        return await this.secureContext(async (o) => {
            return UserDefinition.findOne({
                where: {
                    login,
                },
                ...o,
                ...await this.opts(options),
            });
        });
    }

    async create(user: UserCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await UserDefinition.create(user, {
                ...o,
            });
        });
    }

    async update(id: string, user: UserUpdateAttributes) {
        return await this.secureContext(async (o) => {
            return await UserDefinition.update(user, {
                where: {
                    id,
                },
                ...o,
            });
        });
    }

    async delete(id: string) {
        return await this.secureContext(async (o) => {
            return await UserDefinition.destroy({
                where: {
                    id,
                },
                ...o,
            });
        })
    }

    async changeRole(userId: string, roles: { isAdmin?: boolean }) {
        return await this.secureContext(async (o) => {
            return await UserDefinition.update({
                isAdmin: roles.isAdmin,
            }, {
                where: {
                    id: userId,
                },
                ...o,
            });
        });
    }
}