import User from "@business/modules/user/domain/model/User"
import UserEntity from "./UserEntity"
import Cart from "@business/modules/cart/domain/model/Cart"
import CartEntity from "./CartEntity"
import CartItemEntity from "./CartItemEntity"
import CartItem from "@business/modules/cart/domain/model/CartItem"

export default class UserDatabaseMapper {
    static toEntity(user: User): UserEntity {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cart: this.toCartEntity(user.id, user.cart),
        }
    }
    static toDomain(entity: UserEntity): User {
        if (!entity) return null
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            cart: this.toCart(entity.cart) || null,
        }
    }

    static toCart(entity: CartEntity): Cart {
        if (!entity) return null
        return {
            userId: entity.userId,
            items: entity.items.map(item => this.toItem(item)),
        }
    }

    static toItem(entity: CartItemEntity): CartItem {
        if (!entity) return null
        return {
            productId: entity.productId,
            quantity: entity.quantity,
            price: entity.price,
        }
    }

    static toCartEntity(userId, cart: Cart): CartEntity {
        if (!cart) return null
        return {
            userId: userId,
            items: cart.items.map(item => this.toCartItemEntity(item)),
        }
    }

    static toCartItemEntity(item: CartItem): CartItemEntity {
        if (!item) return null
        return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }
    }
}
