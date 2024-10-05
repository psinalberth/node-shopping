import { Schema, model } from "mongoose"
import ProductEntity from "../entities/ProductEntity"

const productSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            maxlength: 200,
        },
        description: {
            type: String,
            required: true,
            maxlength: 600,
        },
        price: {
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
        collection: "products",
        timestamps: true,
    }
)

export default model<ProductEntity>("ProductSchema", productSchema)
