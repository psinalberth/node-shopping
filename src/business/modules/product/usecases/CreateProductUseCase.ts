import CreateProductCommand from "@business/modules/product/domain/command/CreateProductCommand"
import Product from "@business/modules/product/domain/model/Product"
import ProductRepository from "@business/modules/product/repository/ProductRepository"
import { log } from "@business/modules/shared/Logger"
import Validator from "@business/modules/shared/Validator"
import { injectable, inject } from "tsyringe"

@injectable()
export default class CreateProductUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: ProductRepository,

        @inject("validator")
        private validator: Validator
    ) {}

    public async execute(command: CreateProductCommand): Promise<Product> {
        try {
            return this.validator
                .validate(command)
                .then(cmd =>
                    Product.ofNew(cmd.name, cmd.description, cmd.price)
                )
                .then(product => this.productRepository.save(product))
        } catch (error) {
            log.error("failed due to", error)
        }
    }
}
