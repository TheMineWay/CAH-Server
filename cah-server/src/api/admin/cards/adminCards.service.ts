import { Injectable } from '@nestjs/common';
import CardRepository from 'src/database/repositories/Card.repository';
import { CreateCardDTO } from 'src/models/dtos/Card.dtos';

@Injectable()
export class AdminCardsService {
    constructor() {}

    async createCard(newCard: CreateCardDTO) {
        const repository = new CardRepository({});
        const card = await repository.create(newCard);
        await repository.commit();
        return card.get();
    }

    async deleteCard(id: string) {
        const repository = new CardRepository({});
        await repository.deleteById(id);
        await repository.commit();
    }

    async recoverCard(id: string) {
        const repository = new CardRepository({});
        await repository.recoverByid(id);
        await repository.commit();
    }
}
