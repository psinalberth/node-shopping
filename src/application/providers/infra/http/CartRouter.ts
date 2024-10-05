import GetCartItemsUseCase from "@business/modules/cart/usecases/GetCartItemsUseCase"
import RemoveCartItemUseCase from "@business/modules/cart/usecases/RemoveCartItemUseCase"
import { Router } from "express"
import { container } from "tsyringe"

const router = Router()
const userId = "4bed1f08-fa23-4a99-bcdc-dc501e5ececa"

router.get("/", (_, res) => {
    const useCase = container.resolve(GetCartItemsUseCase)
    useCase.execute().then(items => {
        res.render("cart/cart.pug", { items })
    })
})

router.post("/:productId/remove", (req, res) => {
    const useCase = container.resolve(RemoveCartItemUseCase)
    useCase
        .removeProduct(userId, req.params.productId)
        .then(_ => res.redirect("/cart"))
})

export default router
