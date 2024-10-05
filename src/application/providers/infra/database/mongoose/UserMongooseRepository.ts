import User from "@business/modules/user/domain/model/User"
import UserRepository from "@business/modules/user/domain/repository/UserRepository"
import UserSchema from "./UserSchema"
import UserDatabaseMapper from "../entities/UserDatabaseMapper"
import { log } from "@business/modules/shared/Logger"

export class UserMongooseRepository implements UserRepository {
    public async update(user: User): Promise<User> {
        log.info(`Updating user ${user}`)
        return Promise.resolve(
            UserSchema.findByIdAndUpdate(
                user.id,
                UserDatabaseMapper.toEntity(user)
            )
        ).then(entity => UserDatabaseMapper.toDomain(entity))
    }

    public async save(user: User): Promise<User> {
        log.info(`Saving user ${user}`)
        return Promise.resolve(
            new UserSchema({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        )
            .then(entity => entity.save())
            .then(entity => UserDatabaseMapper.toDomain(entity))
    }

    public async findById(id: string): Promise<User> {
        log.info(`Fetching user with id ${id}`)
        return Promise.resolve(UserSchema.findById(id)).then(entity =>
            UserDatabaseMapper.toDomain(entity)
        )
    }
}
