import { log } from "@business/modules/shared/Logger"
import Database from "@business/modules/shared/infra/database/Database"
import mongoose from "mongoose"

export default class MongoDatabase implements Database {
    connect(): Promise<unknown> {
        const DB_URL = process.env.DB_URL
        log.info("Trying to connect to database " + DB_URL)
        return mongoose.connect(DB_URL)
    }
}
