import { Schema } from "mongoose"

const cartItemSchema = new Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
)

export default cartItemSchema
