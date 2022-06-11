import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getStatus() {
    return 'Up and running!';
  }
}
