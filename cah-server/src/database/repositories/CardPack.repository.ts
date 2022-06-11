import { CardPackAttributes, CardPackCreateAttributes, CardPackDefinition } from "../definitions/CardPack.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class CardPackRepository extends Repository<CardPackAttributes, CardPackCreateAttributes, CardPackDefinition> {
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async create(data: CardPackCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await CardPackDefinition.create(data, {
                ...o,
            });
        });
    }

    public async getById(id: string, options?: RepositoryQueryOptions<CardPackAttributes>) {
        return await this.secureContext(async (o) => {
            return await CardPackDefinition.findByPk(id, {
                ...o,
                ...(await this.opts(options)),
            });
        });
    }

    public async getAll(options?: RepositoryQueryOptions<CardPackAttributes>) {
        return await this.secureContext(async (o) => {
            return await CardPackDefinition.findAll({
                ...o,
                ...(await this.opts(options)),
            });
        });
    }
}