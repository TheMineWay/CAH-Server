import { GameAttributes, GameCreateAttributes, GameDefinition } from "../definitions/Game.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class GameRepository extends Repository<GameAttributes, GameCreateAttributes, GameDefinition> {
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async create(data: GameCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await GameDefinition.create(data, {
                ...o,
            });
        });
    }

    public async getById(id: string, options?: RepositoryQueryOptions<GameAttributes>) {
        return await this.secureContext(async (o) => {
            return await GameDefinition.findByPk(id, {
                ...o,
                ...(await this.opts(options)),
            });
        });
    }

    public async getAll(options?: RepositoryQueryOptions<GameAttributes>) {
        return await this.secureContext(async (o) => {
            return await GameDefinition.findAll({
                ...o,
                ...(await this.opts(options)),
            });
        });
    }
}