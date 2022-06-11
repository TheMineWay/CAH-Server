import { BlackCardAttributes, BlackCardCreateAttributes, BlackCardDefinition } from "../definitions/BlackCard.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class BlackCardRepository extends Repository<BlackCardAttributes, BlackCardCreateAttributes, BlackCardDefinition> {
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async create(data: BlackCardCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await BlackCardDefinition.create(data, {
                ...o,
            });
        });
    }

    public async getById(id: string, options?: RepositoryQueryOptions<BlackCardAttributes>) {
        return await this.secureContext(async (o) => {
            return await BlackCardDefinition.findByPk(id, {
                ...o,
                ...(await this.opts(options)),
            });
        });
    }

    public async getAll(options?: RepositoryQueryOptions<BlackCardAttributes>) {
        return await this.secureContext(async (o) => {
            return await BlackCardDefinition.findAll({
                ...o,
                ...(await this.opts(options)),
            });
        });
    }
}