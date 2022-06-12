import { Injectable } from '@nestjs/common';
import getConf from 'src/conf/Conf';
import getServerInfo from 'src/conf/getServerInfo';

@Injectable()
export class AppService {
  async getStatus() {
    return 'Up and running!';
  }

  async getInfo() {
    const conf = getConf();
    const serverInfo = getServerInfo();

    return {
      port: conf.port,
      ...serverInfo,
    }
  }
}
