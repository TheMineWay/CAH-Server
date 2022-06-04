import getConf from "src/conf/Conf";

export function databaseQueryException(e: any) {
    const conf = getConf();
    if(conf.databaseLogging === 'true') console.log(e);
    throw "Database exception";
}