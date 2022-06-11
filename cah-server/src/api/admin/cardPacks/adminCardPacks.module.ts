import { Module } from '@nestjs/common';
import { AdminCardPacksService } from './adminCardPacks.service';

@Module({
  imports: [],
  providers: [AdminCardPacksService],
  exports: [AdminCardPacksService],
})
export class AdminCardPacksModule {}