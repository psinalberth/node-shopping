import Product from "@business/modules/product/domain/model/Product"

export default interface ProductRepository {
    findById(productId: string): Promise<Product>

    findAll(): Promise<Array<Product>>

    save(product: Product): Promise<Product>

    update(product: Product): Promise<Product>

    removeById(id: string): Promise<void>
}
