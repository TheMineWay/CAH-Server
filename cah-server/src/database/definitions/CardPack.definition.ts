import { DataTypes, Model, Sequelize } from "sequelize";
import { CardDefinition } from './Card.definition'

export class CardPackCreateAttributes {
    declare name: string;
    declare description: string;
    declare language: string; // Language code
}

export class CardPackAttributes extends CardPackCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class CardPackUpdateAttributes extends CardPackCreateAttributes {}

export class CardPackDefinition extends Model<CardPackAttributes, CardPackCreateAttributes> {
    declare CardDefinitions: CardDefinition[];
}

export default async function init(sequelize: Sequelize) {
    CardPackDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(4091),
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    }, {
        tableName: 'cardPacks',
        paranoid: true,
        timestamps: true,
        sequelize,
    });
}