import CartItemMongooseQuery from "@application/providers/infra/database/mongoose/CartItemMongooseQuery"
import MongoDatabase from "@application/providers/infra/database/mongoose/MongoDatabase"
import { OrderMongooseRepository } from "@application/providers/infra/database/mongoose/OrderMongooseRepository"
import { ProductMongooseRepository } from "@application/providers/infra/database/mongoose/ProductMongooseRepository"
import { UserMongooseRepository } from "@application/providers/infra/database/mongoose/UserMongooseRepository"
import CustomValidator from "@application/providers/infra/validator/CustomValidator"
import { container } from "tsyringe"

container.register("ProductRepository", ProductMongooseRepository)
container.register("CartItemRepository", CartItemMongooseQuery)
container.register("UserRepository", UserMongooseRepository)
container.register("OrderRepository", OrderMongooseRepository)
container.register("validator", CustomValidator)
container.register("database", MongoDatabase)
