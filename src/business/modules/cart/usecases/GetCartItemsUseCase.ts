import { inject, injectable } from "tsyringe"
import CartItemRepository from "../repository/CartItemRepository"
import CartItemDto from "../domain/model/CartItemDto"

@injectable()
export default class GetCartItemsUseCase {
    constructor(
        @inject("CartItemRepository")
        private cartItemRepository: CartItemRepository
    ) {}

    public async execute(): Promise<CartItemDto[]> {
        return this.cartItemRepository.findAll()
    }
}
