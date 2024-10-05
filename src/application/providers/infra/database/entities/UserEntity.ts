import CartEntity from "./CartEntity"

export default interface UserEntity {
    id: string
    name: string
    email: string
    cart?: CartEntity
}
