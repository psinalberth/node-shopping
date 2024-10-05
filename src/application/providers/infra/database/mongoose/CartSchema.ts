import { Schema } from "mongoose"
import CartItemSchema from "./CartItemSchema"

const cartSchema = new Schema(
    {
        items: [CartItemSchema],
    },
    {
        _id: false,
    }
)

export default cartSchema
