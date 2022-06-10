import { GameAttributes, GameCreateAttributes, GameDefinition } from "../definitions/Game.definition";
import Repository, { RepositoryOptions } from "./Repository";

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
}