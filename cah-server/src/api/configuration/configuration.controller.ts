import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigurationService } from './configuration.service';

@UseGuards(JwtAuthGuard)
@Controller('configuration')
export class ConfigurationController {
    constructor(private readonly configurationService: ConfigurationService) { }

    @Get()
    async get() {
        return await this.configurationService.getConfiguration();
    }
}