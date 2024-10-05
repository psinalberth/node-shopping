import { inject, injectable } from "tsyringe"
import UserRepository from "../repository/UserRepository"
import User from "../model/User"

@injectable()
export default class UpdateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository
    ) {}

    public async execute(user: User): Promise<User> {
        return this.userRepository.update(user)
    }
}
