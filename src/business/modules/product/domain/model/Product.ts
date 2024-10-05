import Domain from "@business/modules/shared/Domain"

export default class Product {
    id: string
    name: string
    description: string
    price: number
    createdAt: Date
    updatedAt: Date

    private constructor(
        id: string,
        name: string,
        description: string,
        price: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    static ofNew(name: string, description: string, price: number) {
        return new Product(
            Domain.generateId(),
            name,
            description,
            price,
            new Date(),
            new Date()
        )
    }

    static of(
        id: string,
        name: string,
        description: string,
        price: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        return new Product(id, name, description, price, createdAt, updatedAt)
    }

    update(name: string, description: string, price: number) {
        return new Product(
            this.id,
            name,
            description,
            price,
            this.createdAt,
            new Date()
        )
    }
}
