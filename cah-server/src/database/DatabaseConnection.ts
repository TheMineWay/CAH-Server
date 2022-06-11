import { Sequelize } from "sequelize";
import getConf from "src/conf/Conf";
import blackCardInit, { BlackCardDefinition } from "./definitions/BlackCard.definition";
import cardInit, { CardDefinition } from "./definitions/Card.definition";
import cardPackInit, { CardPackDefinition } from "./definitions/CardPack.definition";
import configurationInit from "./definitions/Configuration.definition";
import gameInit, { GameDefinition } from "./definitions/Game.definition";
import inventoryInit, { InventoryDefinition } from "./definitions/Inventory.definition";
import playerInit, { PlayerDefinition } from "./definitions/Player.definition";
import packsInUseInit, { PacksInUseDefinition } from "./definitions/PacksInUse.definition";

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
        gameInit,
        inventoryInit,
        cardInit,
        blackCardInit,
        cardPackInit,
        packsInUseInit,
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

    // Games <--[1:n]--> Players
    GameDefinition.hasMany(PlayerDefinition, {
        foreignKey: 'game',
    });
    PlayerDefinition.belongsTo(GameDefinition, {
        foreignKey: 'game',
    });
    
    // Players <--[1:n]--> Inventory
    PlayerDefinition.hasMany(InventoryDefinition, {
        foreignKey: 'player',
    });
    InventoryDefinition.belongsTo(PlayerDefinition, {
        foreignKey: 'player',
    });

    // Cards <--[1:n]--> Inventory
    CardDefinition.hasMany(InventoryDefinition, {
        foreignKey: 'card',
    });
    InventoryDefinition.belongsTo(CardDefinition, {
        foreignKey: 'card',
    });

    // Cards <--[1:n]--> BlackCard
    CardDefinition.hasMany(BlackCardDefinition, {
        foreignKey: 'card',
    });
    BlackCardDefinition.belongsTo(CardDefinition, {
        foreignKey: 'card',
    });

    // Inventory <--[1:n]--> BlackCard
    InventoryDefinition.hasOne(BlackCardDefinition, {
        foreignKey: 'winner',
    });
    BlackCardDefinition.belongsTo(InventoryDefinition, {
        foreignKey: 'winner',
    });

    // Players <--[1:n]--> BlackCard
    PlayerDefinition.hasMany(BlackCardDefinition, {
        foreignKey: 'player',
    });
    BlackCardDefinition.belongsTo(PlayerDefinition, {
        foreignKey: 'player',
    });

    // CardPack <--[1:n]--> Cards
    CardPackDefinition.hasMany(CardDefinition, {
        foreignKey: 'pack',
    });
    CardDefinition.belongsTo(CardPackDefinition, {
        foreignKey: 'pack',
    });

    // Games <--[1:n]--> PacksInUse
    GameDefinition.hasMany(PacksInUseDefinition, {
        foreignKey: 'game',
    });
    PacksInUseDefinition.belongsTo(GameDefinition, {
        foreignKey: 'game',
    });

    // CardPacks <--[1:n]--> PacksInUse
    CardPackDefinition.hasMany(PacksInUseDefinition, {
        foreignKey: 'pack',
    });
    PacksInUseDefinition.belongsTo(CardPackDefinition, {
        foreignKey: 'pack',
    });
}
export class DatabaseState {
    static sequelize: Sequelize;
}