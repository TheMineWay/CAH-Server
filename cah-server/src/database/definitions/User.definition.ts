import { DataTypes, Model, Sequelize } from "sequelize";
import { hashWithSalt } from "src/cryptography/Cryptography";
import { PlayerDefinition } from "./Player.definition";

export class UserCreateAttributes {
    declare name: string;
    declare login: string;
    declare password: string;
    declare isAdmin: boolean;
}

export class UserAttributes extends UserCreateAttributes {
    declare id: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deletedAt?: Date;
}

export type UserUpdateAttributes = UserCreateAttributes;

export class UserDefinition extends Model<UserAttributes, UserCreateAttributes> {
    declare PlayerDefinitions?: PlayerDefinition[];
}

export default async function init(sequelize: Sequelize) {
    UserDefinition.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
            },
            login: {
                type: DataTypes.STRING(128),
            },
            password: {
                type: DataTypes.STRING(1024),
                set(value: string) {
                    const hashedPassword = hashWithSalt(value);

                    this.setDataValue('password', hashedPassword);
                },
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: true,
            paranoid: true,
        },
    );
}