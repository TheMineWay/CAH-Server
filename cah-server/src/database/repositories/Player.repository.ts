import { PlayerAttributes, PlayerCreateAttributes, PlayerDefinition } from "../definitions/Player.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class PlayerRepository extends Repository<PlayerAttributes, PlayerCreateAttributes, PlayerDefinition> {

    constructor(options: RepositoryOptions) {
        super(options);
    }

    async create(data: PlayerCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await PlayerDefinition.create(data, {
                ...o,
            });
        });
    }

    async getById(id: string, options?: RepositoryQueryOptions<PlayerAttributes>) {
        return await this.secureContext(async (o) => {
            return await PlayerDefinition.findByPk(id, {
                ...o,
                ...(await this.opts(options)),
            });
        });
    }

    async getByPlayerId(userId: string, options?: RepositoryQueryOptions<PlayerAttributes>) {
        return await this.secureContext(async (o) => {
            return await PlayerDefinition.findAll({
                where: {
                    user: userId,
                },
                ...o,
                ...(await this.opts(options)),
            });
        });
    }
}