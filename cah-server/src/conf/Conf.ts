import { config } from 'dotenv';
const lodash = require('lodash');

class Conf {
    constructor(obj: Conf) {
        const pick: (keyof Conf)[] = [
            'jwt',
            'databaseHost',
            'databaseName',
            'databasePassword',
            'databaseUsername',
            'databaseLogging',
        ];
        Object.assign(this, lodash.pick(obj, pick));
    }

    // JWT
    jwt!: string;

    // DATABASE
    databaseHost!: string;
    databasePassword!: string;
    databaseUsername!: string;
    databaseName!: string;
    databaseLogging!: 'true' | 'false';
}

export default function getConf() {
    config();
    return new Conf(process.env as any);
}