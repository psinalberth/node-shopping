import Product from "@business/modules/product/domain/model/Product"

describe("should work", () => {
    it("should create product", async () => {
        const product = Product.ofNew("foo", "bar", 199)

        expect(product.id).not.toBeNull()
        expect(product.createdAt).not.toBeNull()
    })
})
