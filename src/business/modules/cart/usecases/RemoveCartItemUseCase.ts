import { inject, injectable } from "tsyringe"
import UserRepository from "@business/modules/user/domain/repository/UserRepository"

@injectable()
export default class RemoveCartItemUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository
    ) {}

    public async removeProduct(
        userId: string,
        productId: string
    ): Promise<void> {
        this.userRepository
            .findById(userId)
            .then(user => {
                if (user.cart) {
                    const productIndex = user.cart.items.findIndex(
                        i => i.productId === productId
                    )

                    if (productIndex > -1) {
                        user.cart.items.splice(productIndex, 1)
                    }
                }

                return user
            })
            .then(user => this.userRepository.update(user))
    }
}
