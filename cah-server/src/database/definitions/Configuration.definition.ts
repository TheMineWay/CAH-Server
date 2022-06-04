import { DataTypes, Model, Sequelize } from "sequelize";

export class ConfigurationCreateAttributes {
    declare privateRegistration: boolean;
}

export class ConfigurationAttributes extends ConfigurationCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export class ConfigurationDefinition extends Model<ConfigurationAttributes, ConfigurationCreateAttributes> {}

export default async function init(sequelize: Sequelize) {
    ConfigurationDefinition.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            privateRegistration: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            sequelize,
            tableName: 'configuration',
            timestamps: true,
            paranoid: true,
        },
    );
}