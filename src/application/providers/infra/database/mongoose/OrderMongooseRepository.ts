import Order from "@business/modules/order/domain/model/Order"
import OrderRepository from "@business/modules/order/repository/OrderRepository"
import OrderSchema from "./OrderSchema"
import OrderDatabaseMapper from "../entities/OrderDatabaseMapper"
import { log } from "@business/modules/shared/Logger"

export class OrderMongooseRepository implements OrderRepository {
    public async save(order: Order): Promise<Order> {
        log.info(`Saving order with id ${order.id}`)
        return Promise.resolve(
            new OrderSchema({
                id: order.id,
                userId: order.userId,
                totalValue: order.totalValue,
                items: order.items.map(i =>
                    OrderDatabaseMapper.toOrderItemEntity(i)
                ),
            })
        )
            .then(entity => entity.save())
            .then(() => order)
    }

    public async findAll(userId: string): Promise<Order[]> {
        log.info(`Fetching orders from ${userId}`)
        return OrderSchema.find({ userId: userId })
            .then(o => o.map(item => OrderDatabaseMapper.toDomain(item)))
            .then(orders => Promise.resolve(orders))
    }
}
