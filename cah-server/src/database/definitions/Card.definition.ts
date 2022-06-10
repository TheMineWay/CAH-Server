import { Model, DataTypes, Sequelize } from "sequelize";
import { InventoryDefinition } from "./Inventory.definition";

export class CardCreateAttributes {
    declare isBlackCard: boolean;
}

export class CardAttributes extends CardCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class CardUpdateAttributes extends CardCreateAttributes {}

export class CardDefinition extends Model<CardAttributes, CardCreateAttributes> {
    declare InventoryDefinitions: InventoryDefinition[];
}

export default async function init(sequelize: Sequelize) {
    CardDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        isBlackCard: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        tableName: 'cards',
        timestamps: true,
        paranoid: true,
        sequelize,
    });
}