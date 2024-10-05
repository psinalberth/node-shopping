import Product from "@business/modules/product/domain/model/Product"
import ProductRepository from "@business/modules/product/repository/ProductRepository"
import CreateProductUseCase from "@business/modules/product/usecases/CreateProductUseCase"
import Validator from "@business/modules/shared/Validator"

let repository: jest.Mocked<ProductRepository>
let validator: jest.Mocked<Validator>

describe("CreateProductUseCase", () => {
    beforeEach(() => {
        ;(validator = {
            validate: jest.fn((obj: any) => Promise.resolve(obj)),
        }),
            (repository = {
                save: jest.fn((product: Product) => Promise.resolve(product)),
                findAll: jest.fn(),
                findById: jest.fn(),
                update: jest.fn(),
                removeById: jest.fn(),
            })
    })

    describe("Success cases", () => {
        it("should create product successfully", async () => {
            const command = {
                name: "Laptop",
                description: "Very good one",
                price: 999.95,
            }

            const usecase = new CreateProductUseCase(repository, validator)

            validator.validate.mockResolvedValueOnce(command)

            repository.save.mockResolvedValueOnce(
                Product.ofNew("foo", "bar", 99.99)
            )

            usecase.execute(command).then(data => {
                expect(data.createdAt).not.toBeNull()
                expect(data.id).not.toBeNull()
                expect(data.name).toEqual("foo")
            })

            expect(validator.validate).toBeCalledTimes(1)
            expect(repository.save).toBeCalledWith(
                expect.objectContaining({
                    name: "Laptop",
                    description: "Very good one",
                    price: 999.95,
                })
            )
        })
    })

    describe("Error cases", () => {
        it("should fail and not create product", async () => {})
    })
})
