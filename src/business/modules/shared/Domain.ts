import crypto from "crypto"

export default class Domain {
    static generateId() {
        return crypto.randomUUID().toString()
    }
}
