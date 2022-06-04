import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ConfigurationCreateDTO } from 'src/models/dtos/ConfigurationCreate.dto';
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

    @Post()
    async set(@Body(new ValidationPipe()) setConfiguration: ConfigurationCreateDTO) {
        await this.configurationService.setConfiguration(setConfiguration);
    }
}