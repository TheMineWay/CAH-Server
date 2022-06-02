import getConf from "src/conf/Conf";

export const jwtConstants = {
    secret: getConf().jwt,
}