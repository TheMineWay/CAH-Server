import { CardAttributes, CardCreateAttributes, CardDefinition } from "../definitions/Card.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class CardRepository extends Repository<CardAttributes, CardCreateAttributes, CardDefinition> {
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async create(data: CardCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await CardDefinition.create(data, {
                ...o,
            });
        });
    }

    public async getById(id: string, options?: RepositoryQueryOptions<CardAttributes>) {
        return await this.secureContext(async (o) => {
            return await CardDefinition.findByPk(id, {
                ...o,
                ...(await this.opts(options)),
            });
        });
    }

    public async getAll(options?: RepositoryQueryOptions<CardAttributes>) {
        return await this.secureContext(async (o) => {
            return await CardDefinition.findAll({
                ...o,
                ...(await this.opts(options)),
            });
        });
    }
}