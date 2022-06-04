import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigurationController } from './configuration/configuration.controller';
import { ConfigurationService } from './configuration/configuration.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    AppController,
    AuthController,
    ConfigurationController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    JwtService,
    ConfigurationService,
  ],
})
export class AppModule {}
