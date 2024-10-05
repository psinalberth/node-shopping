import { inject, injectable } from "tsyringe"
import OrderRepository from "../repository/OrderRepository"
import Order from "../domain/model/Order"
import UserRepository from "@business/modules/user/domain/repository/UserRepository"
import Domain from "@business/modules/shared/Domain"
import { log } from "@business/modules/shared/Logger"
import OrderItem from "../domain/model/OrderItem"

@injectable()
export default class CreateOrderUseCase {
    constructor(
        @inject("OrderRepository")
        private orderRepository: OrderRepository,
        @inject("UserRepository")
        private userRepository: UserRepository
    ) {}

    public async execute(userId: string): Promise<Order> {
        try {
            return this.userRepository
                .findById(userId)
                .then(user => {
                    if (user.cart) {
                        let items = user.cart.items.map(item =>
                            this.toOrderItem(item)
                        )
                        let order = {
                            id: Domain.generateId(),
                            userId: user.id,
                            items: items,
                            totalValue: items.reduce(
                                (acc, current) =>
                                    acc + current.price * current.quantity,
                                0
                            ),
                        } as Order
                        return {
                            order,
                            user,
                        }
                    }
                })
                .then(async tuple => {
                    const order_1 = await this.orderRepository.save(tuple.order)
                    tuple.user.cart = null
                    this.userRepository.update(tuple.user)
                    return order_1
                })
        } catch (error) {
            log.error("failed due to", error)
        }
    }

    private toOrderItem(item): OrderItem {
        return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }
    }
}
