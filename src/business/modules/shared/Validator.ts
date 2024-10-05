export default interface Validator {
    validate<T>(object: T): Promise<T>
}
