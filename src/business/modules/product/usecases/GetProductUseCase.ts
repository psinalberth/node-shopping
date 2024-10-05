import { inject, injectable } from "tsyringe"
import Product from "../domain/model/Product"
import ProductRepository from "../repository/ProductRepository"

@injectable()
export default class GetProductUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: ProductRepository
    ) {}

    public async execute(productId: string): Promise<Product> {
        return this.productRepository.findById(productId)
    }
}
