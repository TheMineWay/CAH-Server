import { Model, Sequelize, DataTypes } from "sequelize";
import { UserDefinition } from "./User.definition";

export class PlayerCreateAttributes {

    // Associations

    declare user: string;
}

export class PlayerAttributes extends PlayerCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class PlayerDefinition extends Model<PlayerAttributes, PlayerCreateAttributes> {
    declare UserDefinition: UserDefinition;
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
    }, {
        sequelize,
        tableName: 'players',
        timestamps: true,
        paranoid: true,
    });
}