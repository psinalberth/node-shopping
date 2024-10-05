import { inject, injectable } from "tsyringe"
import UserRepository from "../repository/UserRepository"
import User from "../model/User"

@injectable()
export default class GetUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository
    ) {}

    public async execute(id: string): Promise<User> {
        return this.userRepository.findById(id)
    }
}
