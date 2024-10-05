import { inject, injectable } from "tsyringe"
import ProductRepository from "../repository/ProductRepository"
import Product from "../domain/model/Product"
import UpdateProductCommand from "../domain/command/UpdateProductCommand"
import Validator from "@business/modules/shared/Validator"
import { log } from "@business/modules/shared/Logger"

@injectable()
export default class UpdateProductUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: ProductRepository,

        @inject("validator")
        private validator: Validator
    ) {}

    public async execute(command: UpdateProductCommand): Promise<Product> {
        try {
            const { productId, name, description, price } = command
            return this.validator
                .validate(command)
                .then(() => this.productRepository.findById(productId))
                .then(product => product.update(name, description, price))
                .then(product => this.productRepository.update(product))
        } catch (error) {
            log.error("failed due to", error)
        }
    }
}
