import Product from "@business/modules/product/domain/model/Product"
import ProductEntity from "./ProductEntity"

export default class ProductDatabaseMapper {
    static toEntity(product: Product): ProductEntity {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }
    }

    static toDomain(entity: ProductEntity): Product {
        return Product.of(
            entity.id,
            entity.name,
            entity.description,
            entity.price,
            entity.createdAt,
            entity.updatedAt
        )
    }
}
