import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CardAttributes } from 'src/database/definitions/Card.definition';
import { CreateCardDTO, ImportCardsDTO, UpdateCardDTO } from 'src/models/dtos/Card.dtos';
import isAdmin from 'src/permissions/PermissionsChecker';
import { AdminCardsService } from './adminCards.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/cards')
export class AdminCardsController {
    constructor(private readonly adminCardsService: AdminCardsService) { }

    @Post('new')
    async new(@Body(new ValidationPipe({ whitelist: true })) card: CreateCardDTO, @Request() req): Promise<CardAttributes> {
        await isAdmin(req.user.id);
        return await this.adminCardsService.createCard(card);
    }

    @Delete(':id')
    async deleteCard(@Param() params: { id: string }, @Request() req) {
        await isAdmin(req.user.id);
        await this.adminCardsService.deleteCard(params.id);
    }

    @Post('update/:id')
    async updateCard(@Param() params: { id: string }, @Body(new ValidationPipe({ whitelist: true })) card: UpdateCardDTO, @Request() req) {
        await isAdmin(req.user.id);
        return await this.adminCardsService.updateCard(params.id, card);
    }

    @Post('/recover/:id')
    async recoverCard(@Param() params: { id: string }, @Request() req) {
        await isAdmin(req.user.id);
        await this.adminCardsService.recoverCard(params.id);
    }

    @Get('/card/:id')
    async getById(@Param() params: { id: string }, @Request() req) {
        await isAdmin(req.user.id);
        return await this.adminCardsService.getById(params.id);
    }

    @Post('import')
    async import(@Body(new ValidationPipe({ whitelist: true })) cardImport: ImportCardsDTO, @Request() req) {
        await isAdmin(req.user.id);
        return await this.adminCardsService.importCards(cardImport);
    }
}