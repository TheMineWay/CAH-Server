import { PacksInUseAttributes, PacksInUseCreateAttributes, PacksInUseDefinition } from "../definitions/PacksInUse.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class PacksInUseRepository extends Repository<PacksInUseAttributes, PacksInUseCreateAttributes, PacksInUseDefinition> {
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async create(data: PacksInUseCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await PacksInUseDefinition.create(data, {
                ...o,
            });
        });
    }

    public async getById(id: string, options?: RepositoryQueryOptions<PacksInUseAttributes>) {
        return await this.secureContext(async (o) => {
            return await PacksInUseDefinition.findByPk(id, {
                ...o,
                ...(await this.opts(options)),
            });
        });
    }

    public async getAll(options?: RepositoryQueryOptions<PacksInUseAttributes>) {
        return await this.secureContext(async (o) => {
            return await PacksInUseDefinition.findAll({
                ...o,
                ...(await this.opts(options)),
            });
        });
    }
}