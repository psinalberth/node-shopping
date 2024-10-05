import CreateProductUseCase from "@business/modules/product/usecases/CreateProductUseCase"
import { inject, injectable } from "tsyringe"

@injectable()
export default class ProductController {
    constructor(
        @inject("CreateProductUseCase")
        private createProductUseCase: CreateProductUseCase
    ) {}
}
