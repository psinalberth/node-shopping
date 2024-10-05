import CartItemDto from "../domain/model/CartItemDto"

export default interface CartItemRepository {
    findAll(): Promise<CartItemDto[]>
}
