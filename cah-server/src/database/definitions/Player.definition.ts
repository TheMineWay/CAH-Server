import { Model, Sequelize, DataTypes } from "sequelize";
import { BlackCardDefinition } from "./BlackCard.definition";
import { GameDefinition } from "./Game.definition";
import { InventoryDefinition } from "./Inventory.definition";
import { UserDefinition } from "./User.definition";

export class PlayerCreateAttributes {

    // Associations

    declare user: string;
    declare game: string;
}

export class PlayerAttributes extends PlayerCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class PlayerDefinition extends Model<PlayerAttributes, PlayerCreateAttributes> {
    declare UserDefinition: UserDefinition;
    declare GameDefinition: GameDefinition;
    declare InventoryDefinitions: InventoryDefinition[];
    declare BlackCardDefinitions: BlackCardDefinition[];
}

export class PlayerUpdateAttributes extends PlayerCreateAttributes {}

export default async function init(sequelize: Sequelize) {
    PlayerDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user: {
            type: DataTypes.UUID,
        },
        game: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        tableName: 'players',
        timestamps: true,
        paranoid: true,
    });
}