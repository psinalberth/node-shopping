import { inject, injectable } from "tsyringe"
import ProductRepository from "../repository/ProductRepository"
import { log } from "@business/modules/shared/Logger"

@injectable()
export default class DeleteProductUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: ProductRepository
    ) {}

    public async execute(id: string): Promise<void> {
        try {
            this.productRepository.removeById(id)
        } catch (error) {
            log.error("Could not remove product from database due to ", error)
        }
    }
}
