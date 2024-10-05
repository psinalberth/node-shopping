import Cart from "@business/modules/cart/domain/model/Cart"

export default interface User {
    id: string
    name: string
    email: string
    cart?: Cart
}
