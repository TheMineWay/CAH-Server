import { DataTypes, Model, Sequelize } from "sequelize";
import { CardPackDefinition } from "./CardPack.definition";
import { GameDefinition } from "./Game.definition";

export class PacksInUseCreateAttributes {

    // Associations

    declare pack: string;
    declare game: string;
}

export class PacksInUseAttributes extends PacksInUseCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class PacksInUseUpdateAttributes extends PacksInUseCreateAttributes {}

export class PacksInUseDefinition extends Model<PacksInUseAttributes, PacksInUseCreateAttributes> {
    declare GameDefinition: GameDefinition;
    declare CardPackDefinition: CardPackDefinition;
}

export default async function (sequelize: Sequelize) {
    PacksInUseDefinition.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        pack: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        game: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        tableName: 'packsInUse',
        paranoid: true,
        timestamps: true,
        sequelize,
    });
}