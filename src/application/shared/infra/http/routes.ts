import productRouter from "@application/providers/infra/http/ProductRouter"
import cartRouter from "@application/providers/infra/http/CartRouter"
import orderRouter from "@application/providers/infra/http/OrderRouter"
import { Router } from "express"

const router = Router()

router.use("/products", productRouter)
router.use("/cart", cartRouter)
router.use("/orders", orderRouter)

export default router
