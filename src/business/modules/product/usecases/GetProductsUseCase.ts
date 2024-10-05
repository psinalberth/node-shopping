import { inject, injectable } from "tsyringe"
import ProductRepository from "../repository/ProductRepository"
import Product from "../domain/model/Product"

@injectable()
export default class GetProductsUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: ProductRepository
    ) {}

    public async execute(): Promise<Product[]> {
        return this.productRepository.findAll()
    }
}
