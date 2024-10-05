import { Schema } from "mongoose"

const orderItemSchema = new Schema(
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

export default orderItemSchema
