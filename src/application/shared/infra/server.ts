import { config } from "dotenv"
import express from "express"
import { container, inject, injectable } from "tsyringe"
import router from "./http/routes"
import Database from "@business/modules/shared/infra/database/Database"
import path from "path"
import { log } from "@business/modules/shared/Logger"
import GetUserUseCase from "@business/modules/user/domain/usecases/GetUserUseCase"
import CreateUserUseCase from "@business/modules/user/domain/usecases/CreateUserUseCase"

@injectable()
export class Server {
    constructor(@inject("database") private database: Database) {}
    app = express()
    getUser = container.resolve(GetUserUseCase)
    saveUser = container.resolve(CreateUserUseCase)

    startup() {
        config()

        const PORT = process.env.APP_PORT || 8080

        this.app.set(
            "views",
            path.join(
                path.dirname(require.main.filename),
                "application",
                "mvc",
                "views"
            )
        )
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use((req, _, next) => {
            if (!req.user) {
                this.getUser
                    .execute("4bed1f08-fa23-4a99-bcdc-dc501e5ececa")
                    .then(user => {
                        if (!user) {
                            user = {
                                id: "4bed1f08-fa23-4a99-bcdc-dc501e5ececa",
                                name: "John Smith",
                                email: "smith.jon@example.com",
                            }
                            this.saveUser.execute(user)
                        }
                        req.user = user

                        log.info(`Found ${req.user.name}`)
                    })
            }
            next()
        })

        this.app.set("view engine", "pug")
        this.app.use(router)

        this.database.connect().then(() => {
            this.app.listen(PORT, () => {
                log.info(`🚀 Listening at port ${PORT}...`)
            })
        })
    }
}
