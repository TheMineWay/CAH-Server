import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ConfigurationCreateDTO } from 'src/models/dtos/Configuration.dtos';
import isAdmin from 'src/permissions/PermissionsChecker';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigurationService } from './configuration.service';

@UseGuards(JwtAuthGuard)
@Controller('configuration')
export class ConfigurationController {
    constructor(private readonly configurationService: ConfigurationService) { }

    @Get()
    async get(@Request() req) {
        await isAdmin(req.user.id);
        return await this.configurationService.getConfiguration();
    }

    @Post()
    async set(@Body(new ValidationPipe()) setConfiguration: ConfigurationCreateDTO, @Request() req) {
        await isAdmin(req.user.id);
        await this.configurationService.setConfiguration(setConfiguration);
    }
}