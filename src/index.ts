import "reflect-metadata"
import "@application/shared/infra/container"
import { Server } from "@application/shared/infra/server"
import { container } from "tsyringe"

const server = container.resolve(Server)
server.startup()
