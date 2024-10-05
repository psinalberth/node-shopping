export default interface Database {
    connect(): Promise<unknown>
}
