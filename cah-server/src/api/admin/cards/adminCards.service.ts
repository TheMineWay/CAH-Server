import { Injectable } from '@nestjs/common';
import { CardUpdateAttributes } from 'src/database/definitions/Card.definition';
import CardRepository from 'src/database/repositories/Card.repository';
import { CreateCardDTO, ImportCardsDTO } from 'src/models/dtos/Card.dtos';

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
        await repository.recoverById(id);
        await repository.commit();
    }

    async updateCard(id: string, data: CardUpdateAttributes) {
        const repository = new CardRepository({});
        const card = await repository.updateById(id, data);
        await repository.commit();
        return card.get();
    }

    async getById(id: string) {
        const repository = new CardRepository({ transaction: null });
        const card = await repository.getById(id);
        return card.get();
    }

    async importCards(importCards: ImportCardsDTO) {
        const repository = new CardRepository({});
        const cards = await repository.bulkCreate(importCards.cards);
        await repository.commit();
        return cards.map((c) => c.get());
    }
}
