import { inject, injectable } from "tsyringe"
import AddProductToCartCommand from "../domain/command/AddProductToCartCommand"
import ProductRepository from "@business/modules/product/repository/ProductRepository"
import UserRepository from "@business/modules/user/domain/repository/UserRepository"

@injectable()
export default class AddProductToCartUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: ProductRepository,
        @inject("UserRepository")
        private userRepository: UserRepository
    ) {}
    public async addProduct(command: AddProductToCartCommand): Promise<void> {
        this.userRepository
            .findById(command.userId)
            .then(user => {
                if (!user.cart) {
                    user.cart = {
                        userId: user.id,
                        items: [],
                    }
                }
                return user
            })
            .then(user => {
                const productId = command.productId
                return this.productRepository.findById(productId).then(p => {
                    const productIndex = user.cart.items.findIndex(
                        i => i.productId === productId
                    )

                    if (productIndex > -1) {
                        user.cart.items[productIndex].quantity += 1
                    } else {
                        let item = {
                            quantity: 1,
                            productId: productId,
                            price: p.price,
                        }

                        user.cart.items.push(item)
                    }

                    return user
                })
            })
            .then(user => this.userRepository.update(user))
    }
}
