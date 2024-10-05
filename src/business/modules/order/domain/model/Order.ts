import OrderItem from "./OrderItem"

export default interface Order {
    id: string
    userId: string
    items: OrderItem[]
    totalValue: number
    createdAt: Date
}
