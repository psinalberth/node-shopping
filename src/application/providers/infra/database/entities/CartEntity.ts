import CartItemEntity from "./CartItemEntity"

export default interface CartEntity {
    userId: string
    items: CartItemEntity[]
}
