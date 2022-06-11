import { DataTypes, Model, Sequelize } from "sequelize";
import { CardDefinition } from "./Card.definition";
import { InventoryDefinition } from "./Inventory.definition";
import { PlayerDefinition } from "./Player.definition";

export class BlackCardCreateAttributes {

    // Associations

    declare card: string; // CardDefinition
    declare player: string; // PlayerDefinition
    declare winner: string; // InventoryDefinition
}

export class BlackCardAttributes extends BlackCardCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class BlackCardUpdateAttributes extends BlackCardCreateAttributes {}

export class BlackCardDefinition extends Model<BlackCardAttributes, BlackCardCreateAttributes> {
    declare CardDefinition: CardDefinition;
    declare PlayerDefinition: PlayerDefinition;
    declare InventoryDefinition: InventoryDefinition;
}

export default async function init(sequelize: Sequelize) {
    BlackCardDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        card: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        player: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        winner: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    }, {
        tableName: 'blackCard',
        paranoid: true,
        timestamps: true,
        sequelize,
    });
}