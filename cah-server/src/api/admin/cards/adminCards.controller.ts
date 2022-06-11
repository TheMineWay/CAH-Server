import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CardAttributes } from 'src/database/definitions/Card.definition';
import { CreateCardDTO } from 'src/models/dtos/Card.dtos';
import isAdmin from 'src/permissions/PermissionsChecker';
import { AdminCardsService } from './adminCards.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/cards')
export class AdminCardsController {
    constructor(private readonly adminCardsService: AdminCardsService) { }

    @Post('new')
    async set(@Body(new ValidationPipe({ whitelist: true })) card: CreateCardDTO, @Request() req): Promise<CardAttributes> {
        await isAdmin(req.user.id);
        return await this.adminCardsService.createCard(card);
    }
}