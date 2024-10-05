import { inject, injectable } from "tsyringe"
import OrderRepository from "../repository/OrderRepository"
import Order from "../domain/model/Order"

@injectable()
export default class GetOrdersUseCase {
    constructor(
        @inject("OrderRepository")
        private orderRepository: OrderRepository
    ) {}

    public async execute(userId: string): Promise<Array<Order>> {
        return this.orderRepository.findAll(userId)
    }
}
