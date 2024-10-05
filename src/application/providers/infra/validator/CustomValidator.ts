import Validator from "@business/modules/shared/Validator"

export default class CustomValidator implements Validator {
    validate<T>(object: T): Promise<T> {
        return Promise.resolve(object)
    }
}
