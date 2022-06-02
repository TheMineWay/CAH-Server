import { Injectable } from '@nestjs/common';
import UserRepository from 'src/database/repositories/User.repository';
import { UserModel } from 'src/models/database/User.model';

@Injectable()
export class UsersService {
    async findOne(login: string): Promise<UserModel | undefined> {
        const userRepository = new UserRepository({ transaction: null });
        return (await userRepository.getByLogin(login)).get();
    }
}