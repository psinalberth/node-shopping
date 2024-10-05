import CartItemRepository from "@business/modules/cart/repository/CartItemRepository"
import CartItemDto from "@business/modules/cart/domain/model/CartItemDto"
import UserSchema from "./UserSchema"

export default class CartItemMongooseQuery implements CartItemRepository {
    findAll(): Promise<CartItemDto[]> {
        return UserSchema.aggregate<CartItemDto>([
            {
                $unwind: {
                    path: "$cart.items",
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$cart.items"],
                    },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "result",
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ["$result", 0],
                            },
                            "$$ROOT",
                        ],
                    },
                },
            },
            {
                $project: {
                    productId: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    quantity: 1,
                },
            },
        ]).exec()
    }
}
