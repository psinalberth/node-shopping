import OrderItemEntity from "./OrderItemEntity"

export default interface OrderEntity {
    id: string
    userId: string
    totalValue: number
    createdAt: Date
    items: OrderItemEntity[]
}
