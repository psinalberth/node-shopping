import CreateProductCommand from "@business/modules/product/domain/command/CreateProductCommand"
import UpdateProductCommand from "@business/modules/product/domain/command/UpdateProductCommand"
import CreateProductUseCase from "@business/modules/product/usecases/CreateProductUseCase"
import DeleteProductUseCase from "@business/modules/product/usecases/DeleteProductUseCase"
import GetProductUseCase from "@business/modules/product/usecases/GetProductUseCase"
import GetProductsUseCase from "@business/modules/product/usecases/GetProductsUseCase"
import UpdateProductUseCase from "@business/modules/product/usecases/UpdateProductUseCase"
import { log } from "@business/modules/shared/Logger"
import { Router } from "express"
import { container } from "tsyringe"
import AddProductToCartUseCase from "@business/modules/cart/usecases/AddProductToCartUseCase"

const router = Router()
const userId = "4bed1f08-fa23-4a99-bcdc-dc501e5ececa"

router.get("/", (_r, res) => {
    const usecase = container.resolve(GetProductsUseCase)

    usecase.execute().then(products => {
        res.render("product/products.pug", { products })
    })
})

router.get("/add-product", (_, res) => {
    res.render("product/product.pug")
})

router.get("/:productId/view-product", (req, res) => {
    const usecase = container.resolve(GetProductUseCase)
    const productId = req.params.productId

    usecase.execute(productId).then(product => {
        res.render("product/view-product.pug", {
            editing: true,
            product,
        })
    })
})

router.post("/add-product", (req, res) => {
    const { name, description, price } = req.body
    const command: CreateProductCommand = {
        name,
        description,
        price,
    }

    const useCase = container.resolve(CreateProductUseCase)

    useCase.execute(command).then(() => {
        res.redirect("/products")
    })
})

router.get("/:productId/edit-product", (req, res) => {
    const usecase = container.resolve(GetProductUseCase)
    const productId = req.params.productId

    usecase.execute(productId).then(product => {
        res.render("product/product.pug", {
            editing: true,
            product,
        })
    })
})

router.post("/:productId/edit-product", (req, res) => {
    const { name, description, price } = req.body
    const productId = req.params.productId
    const command: UpdateProductCommand = {
        productId,
        name,
        description,
        price,
    }

    const useCase = container.resolve(UpdateProductUseCase)

    useCase.execute(command).then(() => {
        res.redirect("/products")
    })
})

router.post("/:productId/add-to-cart", (req, res) => {
    const productId = req.params.productId
    const usecase = container.resolve(AddProductToCartUseCase)

    usecase
        .addProduct({
            userId: userId,
            productId: productId,
        })
        .then(_ => res.redirect("/products"))
})

router.get("/:productId/remove", (req, res) => {
    const usecase = container.resolve(DeleteProductUseCase)
    const productId = req.params.productId

    usecase.execute(productId).then(() => {
        res.redirect("/products")
    })
})

router.get("/:productId", (req, res) => {
    const usecase = container.resolve(GetProductUseCase)
    const productId = req.params.productId

    usecase
        .execute(productId)
        .then(product => res.json(product))
        .catch(_ => {
            const errorMessage = `It was not possible to fetch product with id ${productId}`
            log.error(errorMessage)
            res.status(404).json({
                status: res.statusCode,
                message: errorMessage,
                timestamp: new Date(),
                path: req.path,
            })
        })
})

export default router
