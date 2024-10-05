import Order from "@business/modules/order/domain/model/Order"
import OrderItem from "@business/modules/order/domain/model/OrderItem"
import OrderItemEntity from "./OrderItemEntity"
import OrderEntity from "./OrderEntity"

export default class OrderDatabaseMapper {
    static toDomain(order: OrderEntity): Order {
        return {
            id: order.id,
            userId: order.userId,
            totalValue: order.totalValue,
            createdAt: order.createdAt,
            items: order.items.map(item => this.toOrderItem(item)),
        }
    }

    static toOrderItem(item: OrderItemEntity): OrderItem {
        return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }
    }

    static toOrderItemEntity(item: OrderItem): OrderItemEntity {
        return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }
    }
}
