import { DataTypes, Model, Sequelize } from "sequelize";
import { PlayerDefinition } from "./Player.definition";

export class GameCreateAttributes {
    declare cardsPerUser: number;
}

export class GameAttributes extends GameCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class GameUpdateAttributes extends GameCreateAttributes {}

export class GameDefinition extends Model<GameAttributes, GameCreateAttributes> {
    declare PlayerDefinitions: PlayerDefinition[];
}

export default async function init(sequelize: Sequelize) {
    GameDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        cardsPerUser: {
            type: DataTypes.INTEGER,
            defaultValue: 7,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'games',
        timestamps: true,
        paranoid: true,
    });
}