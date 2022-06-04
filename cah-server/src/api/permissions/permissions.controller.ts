import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { SetAdminStateDTO } from 'src/models/dtos/Permission.dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import PermissionsService from './permissions.service';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) { }

    // Protect
    @Post('setAdminState')
    async setAdminState(@Body(new ValidationPipe()) body: SetAdminStateDTO) {
        await this.permissionsService.setAdminState(body.userId, body.isAdmin);
    }
}