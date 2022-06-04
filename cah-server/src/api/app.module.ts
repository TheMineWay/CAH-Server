import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
  ],
  controllers: [
    AppController,
    AuthController,
    ConfigurationController,
    PermissionsController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    JwtService,
    ConfigurationService,
    PermissionsService,
  ],
})
export class AppModule {}
