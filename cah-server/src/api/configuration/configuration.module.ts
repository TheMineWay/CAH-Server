import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}