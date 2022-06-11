import { HttpException } from "@nestjs/common";
import getConf from "src/conf/Conf";

export function databaseQueryException(e: any) {
    const conf = getConf();
    if(conf.databaseLogging === 'true') console.log(e);
    throw "Database exception";
}

export function formatError(e?: any) {
    throw new HttpException(
        'Format error',
        406,
    );
}

export function iAmATeaPotError(e?: any) {
    throw new HttpException(
        'I am a teapot!',
        418,
    );
}