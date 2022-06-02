import { UnauthorizedException } from "@nestjs/common";
import UserRepository from "src/database/repositories/User.repository";

export default async function isAdmin(userId: string, opts?: { preventException?: boolean; }): Promise<boolean> {
    try {
        const userRepository = new UserRepository({});
        const user = await userRepository.getAdminById(userId);
        await userRepository.commit();
        return user.getDataValue('isAdmin');
    } catch(e: any) {
        if(!opts?.preventException) throw new UnauthorizedException();
        return false;
    }
}