import { Sequelize } from "sequelize";

export default async function generateNewTransaction(sequelize: Sequelize) {
    return await sequelize.transaction();
}