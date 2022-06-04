import UserRepository from "src/database/repositories/User.repository";

export default class PermissionsService {
    constructor() {}

    public async setAdminState(userId: string, isAdmin: boolean) {
        const userRepository = new UserRepository({});
        await userRepository.setAdminById(userId, isAdmin);
        await userRepository.commit();
    }
}