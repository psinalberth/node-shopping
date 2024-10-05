import { model, Schema } from "mongoose"
import OrderEntity from "../entities/OrderEntity"
import OrderItemSchema from "./OrderItemSchema"

const orderSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        items: [OrderItemSchema],
        totalValue: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "orders",
        timestamps: true,
    }
)

export default model<OrderEntity>("OrderSchema", orderSchema)
