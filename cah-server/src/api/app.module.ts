import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminCardsController } from './admin/cards/adminCards.controller';
import { AdminCardsModule } from './admin/cards/adminCards.module';
import { AdminCardsService } from './admin/cards/adminCards.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigurationController } from './configuration/configuration.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { PermissionsController } from './permissions/permissions.controller';
import { PermissionsModule } from './permissions/permissions.module';
import PermissionsService from './permissions/permissions.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    AuthModule,
    ConfigurationModule,
    PermissionsModule,
    AdminCardsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    ConfigurationController,
    PermissionsController,
    AdminCardsController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    JwtService,
    ConfigurationService,
    PermissionsService,
    AdminCardsService,
  ],
})
export class AppModule {}
