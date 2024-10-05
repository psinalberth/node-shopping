import CreateOrderUseCase from "@business/modules/order/usecases/CreateOrderUseCase"
import GetOrdersUseCase from "@business/modules/order/usecases/GetOrdersUseCase"
import { Router } from "express"
import { container } from "tsyringe"

const router = Router()
const userId = "4bed1f08-fa23-4a99-bcdc-dc501e5ececa"

router.post("/", (_, res) => {
    const usecase = container.resolve(CreateOrderUseCase)
    usecase.execute(userId).then(_ => res.redirect("/cart"))
})

router.get("/", (_, res) => {
    const usecase = container.resolve(GetOrdersUseCase)
    usecase.execute(userId).then(orders => {
        res.render("order/orders.pug", { orders })
    })
})
export default router
