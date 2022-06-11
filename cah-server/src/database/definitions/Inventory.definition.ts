import { Sequelize, DataTypes, Model } from "sequelize";
import { BlackCardDefinition } from "./BlackCard.definition";
import { CardDefinition } from "./Card.definition";
import { PlayerDefinition } from "./Player.definition";

export class InventoryCreateAttributes {

    // Associations

    declare card: string;
    declare player: string;
}

export class InventoryAttributes extends InventoryCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class InventoryUpdateAttributes extends InventoryCreateAttributes {}

export class InventoryDefinition extends Model<InventoryAttributes, InventoryCreateAttributes> {
    declare PlayerDefinition: PlayerDefinition;
    declare CardDefinition: CardDefinition;
    declare BlackCardDefinition: BlackCardDefinition;
}

export default async function init(sequelize: Sequelize) {
    InventoryDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        player: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        card: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'inventory',
        timestamps: true,
        paranoid: true,
    });
}