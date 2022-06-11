import { Module } from '@nestjs/common';
import { AdminCardsService } from './adminCards.service';

@Module({
  imports: [],
  providers: [AdminCardsService],
  exports: [AdminCardsService],
})
export class AdminCardsModule {}