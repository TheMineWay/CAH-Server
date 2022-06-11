import { Model, DataTypes, Sequelize } from "sequelize";
import { CardPackDefinition } from "./CardPack.definition";
import { InventoryDefinition } from "./Inventory.definition";

export class CardCreateAttributes {
    declare isBlackCard: boolean;
    declare content: string[];
    declare pack: string; // CardPackDefinition
}

export class CardAttributes extends CardCreateAttributes {
    declare id: string;

    declare rawContent: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class CardUpdateAttributes extends CardCreateAttributes {}

export class CardDefinition extends Model<CardAttributes, CardCreateAttributes> {
    declare InventoryDefinitions: InventoryDefinition[];
    declare CardPackDefinition: CardPackDefinition;
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
        rawContent: {
            type: DataTypes.STRING(2048),
            allowNull: false,
            set() {},
        },
        content: {
            type: DataTypes.VIRTUAL,
            set(content: string[]) {
                this.setDataValue('rawContent', JSON.stringify(content));
            },
            get(): string[] {
                return JSON.parse(this.getDataValue('rawContent'));
            },
        },
        pack: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        tableName: 'cards',
        timestamps: true,
        paranoid: true,
        sequelize,
    });
}