import { Schema, model } from "mongoose"
import UserEntity from "../entities/UserEntity"
import CartSchema from "./CartSchema"

const userSchema = new Schema(
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
        email: {
            type: String,
            required: true,
            maxlength: 200,
        },
        cart: { type: CartSchema },
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
        collection: "users",
        timestamps: true,
    }
)

export default model<UserEntity>("UserSchema", userSchema)
