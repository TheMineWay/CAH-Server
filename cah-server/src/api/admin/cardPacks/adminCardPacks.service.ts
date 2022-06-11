import { Injectable } from '@nestjs/common';
import CardPackRepository from 'src/database/repositories/CardPack.repository';
import { CreateCardPackDTO, UpdateCardPackDTO } from 'src/models/dtos/CardPack.dtos';

@Injectable()
export class AdminCardPacksService {
    constructor() {}

    async createPack(newPack: CreateCardPackDTO) {
        const repository = new CardPackRepository({});
        const cardPack = await repository.create(newPack);
        await repository.commit();
        return cardPack.get();
    }

    async deletePack(id: string) {
        const repository = new CardPackRepository({});
        await repository.deleteById(id);
        await repository.commit();
    }

    async recoverPack(id: string) {
        const repository = new CardPackRepository({});
        await repository.recoverById(id);
        await repository.commit();
    }

    async updatePack(id: string, data: UpdateCardPackDTO) {
        const repository = new CardPackRepository({});
        const cardPack = await repository.updateById(id, data);
        await repository.commit();
        return cardPack.get();
    }

    async getById(id: string) {
        const repository = new CardPackRepository({ transaction: null });
        return (await repository.getById(id)).get();
    }
}
