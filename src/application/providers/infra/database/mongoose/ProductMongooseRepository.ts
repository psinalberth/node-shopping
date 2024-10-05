import Product from "@business/modules/product/domain/model/Product"
import ProductRepository from "@business/modules/product/repository/ProductRepository"
import ProductSchema from "./ProductSchema"
import ProductDatabaseMapper from "../entities/ProductDatabaseMapper"
import { log } from "@business/modules/shared/Logger"

export class ProductMongooseRepository implements ProductRepository {
    public async findById(productId: string): Promise<Product> {
        log.info(`Fetching product with id ${productId} from database`)
        return ProductSchema.findById(productId)
            .then(entity => ProductDatabaseMapper.toDomain(entity))
            .then(p => Promise.resolve(p))
    }

    public async findAll(): Promise<Product[]> {
        log.info("Querying products from database.")
        return ProductSchema.find()
            .then(p => p.map(entity => ProductDatabaseMapper.toDomain(entity)))
            .then(products => Promise.resolve(products))
    }

    public async save(product: Product): Promise<Product> {
        log.info(`Saving product ${product.id}`)
        return Promise.resolve(
            new ProductSchema({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            })
        )
            .then(entity => entity.save())
            .then(entity => ProductDatabaseMapper.toDomain(entity))
    }

    public async update(product: Product): Promise<Product> {
        log.info(`Updating product ${product.id}`)
        return Promise.resolve(
            ProductSchema.findByIdAndUpdate(
                product.id,
                ProductDatabaseMapper.toEntity(product)
            )
        ).then(entity => ProductDatabaseMapper.toDomain(entity))
    }

    public async removeById(id: string): Promise<void> {
        log.info(`Removing product with ${id}`)
        return Promise.resolve(ProductSchema.findByIdAndDelete(id)).then(
            result => log.info(`Product ${result.id} removed successfully`)
        )
    }
}
