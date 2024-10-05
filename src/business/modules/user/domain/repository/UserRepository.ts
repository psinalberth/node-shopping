import User from "../model/User"

export default interface UserRepository {
    save(user: User): Promise<User>

    findById(id: string): Promise<User> | null

    update(user: User): Promise<User>
}
