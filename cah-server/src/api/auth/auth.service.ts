import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareHashWithSalt } from 'src/cryptography/Cryptography';
import { UserModel } from 'src/models/database/User.model';
import PayloadModel from 'src/models/Payload.model';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(login: string, pass: string) {
        const user = await this.usersService.findOne(login);
        if (user && compareHashWithSalt(user.password, pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UserModel) {
        const payload: PayloadModel = { login: user.login, id: user.id };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: jwtConstants.secret,
            }),
        };
    }
}