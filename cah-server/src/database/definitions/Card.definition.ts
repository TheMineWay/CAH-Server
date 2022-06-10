import { Model, DataTypes, Sequelize } from "sequelize";
import { InventoryDefinition } from "./Inventory.definition";

export class CardCreateAttributes {
    declare isBlackCard: boolean;
    declare content: string;
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
        content: {
            type: DataTypes.STRING(2048),
            allowNull: false,
            set(content: string[]) {
                this.setDataValue('content', JSON.stringify(content));
            },
            get(): string[] {
                return JSON.parse(this.getDataValue('content'));
            },
        },
    }, {
        tableName: 'cards',
        timestamps: true,
        paranoid: true,
        sequelize,
    });
}