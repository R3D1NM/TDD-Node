const productController = require('../../controller/products')
const productModel = require('../../models/Product')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')

productModel.create = jest.fn();

let req, res, next
beforeEach(()=>{
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe("Product Controller Create", () =>{
    beforeEach(()=>{
        req.body = newProduct
    })

    test("should have a createProduct function",()=>{
        expect(typeof productController.createProduct).toBe("function")
    })
    test("should call ProductModel.create", async () => {
        await productController.createProduct(req,res,next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })
    test("should return 201 status code", async () =>{
        await productController.createProduct(req,res,next)
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy()
    })
    test("should return json body in response", async ()=>{
        productModel.create.mockReturnValue(newProduct)
        await productController.createProduct(req,res,next)
        expect(res._getJSONData()).toStrictEqual(newProduct)
    })
    test('should handle errors', async () => { 
        const errorMessage = {message: "required proeprty missing"}
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.create.mockReturnValue(rejectedPromise)

        await productController.createProduct(req,res,next)
        expect(next).toBeCalledWith(errorMessage)
    })
})
