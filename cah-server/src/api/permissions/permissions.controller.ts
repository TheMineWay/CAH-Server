import { Body, Controller, Post, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { SetAdminStateDTO } from 'src/models/dtos/Permission.dtos';
import isAdmin from 'src/permissions/PermissionsChecker';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import PermissionsService from './permissions.service';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) { }

    @Post('setAdminState')
    async setAdminState(@Body(new ValidationPipe()) body: SetAdminStateDTO, @Request() req) {
        await isAdmin(req.user.id);
        await this.permissionsService.setAdminState(body.userId, body.isAdmin);
    }
}