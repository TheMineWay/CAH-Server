import { UnauthorizedException } from "@nestjs/common";
import UserRepository from "src/database/repositories/User.repository";

export default async function isAdmin(userId: string) {
    // Noo need for transactions
    const userRepository = new UserRepository({ transaction: null, });
    const user = await userRepository.getAdminById(userId);
    
    if(!user) throw new UnauthorizedException();

    const isAdmin = user.getDataValue('isAdmin');
    if(!isAdmin) throw new UnauthorizedException();

    return isAdmin;
}