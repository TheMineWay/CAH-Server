import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CardPackAttributes } from 'src/database/definitions/CardPack.definition';
import { CreateCardPackDTO, UpdateCardPackDTO } from 'src/models/dtos/CardPack.dtos';
import isAdmin from 'src/permissions/PermissionsChecker';
import { AdminCardPacksService } from './adminCardPacks.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/card-packs')
export class AdminCardPacksController {
    constructor(private readonly adminCardPacksService: AdminCardPacksService) { }

    @Post('new')
    async new(@Body(new ValidationPipe({ whitelist: true })) pack: CreateCardPackDTO, @Request() req): Promise<CardPackAttributes> {
        await isAdmin(req.user.id);
        return await this.adminCardPacksService.createPack(pack);
    }

    @Delete(':id')
    async deleteCard(@Param() params: { id: string }, @Request() req) {
        await isAdmin(req.user.id);
        await this.adminCardPacksService.deletePack(params.id);
    }

    @Post('update/:id')
    async updateCard(@Param() params: { id: string }, @Body(new ValidationPipe({ whitelist: true })) card: UpdateCardPackDTO, @Request() req) {
        await isAdmin(req.user.id);
        return await this.adminCardPacksService.updatePack(params.id, card);
    }

    @Post('/recover/:id')
    async recoverCard(@Param() params: { id: string }, @Request() req) {
        await isAdmin(req.user.id);
        await this.adminCardPacksService.recoverPack(params.id);
    }

    @Get('/pack/:id')
    async getById(@Param() params: { id: string }, @Request() req) {
        await isAdmin(req.user.id);
        return await this.adminCardPacksService.getById(params.id);
    }
}