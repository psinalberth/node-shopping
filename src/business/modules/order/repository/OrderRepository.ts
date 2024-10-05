import Order from "../domain/model/Order"

export default interface OrderRepository {
    save(order: Order): Promise<Order>

    findAll(userId: string): Promise<Array<Order>>
}
