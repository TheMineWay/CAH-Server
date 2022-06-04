import { Sequelize } from "sequelize";
import getConf from "src/conf/Conf";
import configurationInit from "./definitions/Configuration.definition";
import playerInit, { PlayerDefinition } from "./definitions/Player.definition";

// Inits
import userInit, { UserDefinition } from "./definitions/User.definition";

export default async function databaseConnect() {

    const conf = getConf();

    try {
        const sequelize: Sequelize = new Sequelize(conf.databaseName, conf.databaseUsername, conf.databasePassword, {
            host: conf.databaseHost,
            dialect: 'mariadb',
        });

        await sequelize.authenticate();

        DatabaseState.sequelize = sequelize;

        for (const init of getAllInits()) {
            await init(sequelize);
        }

        associate();

        await sequelize.sync({ alter: true });
    } catch (e: any) {
        console.log("[DATABASE ERROR]: Error while connecting to the database.\nDetails:");
        console.log(e);
        throw e;
    }
}

const getAllInits = (): ((sequelize: Sequelize) => Promise<void>)[] => {
    return [
        userInit,
        configurationInit,
        playerInit,
    ];
}

const associate = () => {
    // Users <--[1:n]--> Players
    UserDefinition.hasMany(PlayerDefinition, {
        foreignKey: 'user',
    });
    PlayerDefinition.belongsTo(UserDefinition, {
        foreignKey: 'user',
    });
}
export class DatabaseState {
    static sequelize: Sequelize;
}