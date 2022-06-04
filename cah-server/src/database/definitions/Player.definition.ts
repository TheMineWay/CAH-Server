import { Model, Sequelize, DataTypes } from "sequelize";

export class PlayerCreateAttributes {}

export class PlayerAttributes extends PlayerCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class PlayerDefinition extends Model<PlayerAttributes, PlayerCreateAttributes> {}

export class PlayerUpdateAttributes extends PlayerCreateAttributes {}

export default async function init(sequelize: Sequelize) {
    PlayerDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    }, {
        sequelize,
        tableName: 'players',
        timestamps: true,
        paranoid: true,
    });
}