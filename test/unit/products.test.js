const productController = require('../../controller/products')
const productModel = require('../../models/Product')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')
const allProducts = require('../data/all-products.json')

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn()
productModel.findByIdAndUpdate = jest.fn()

const productId = "12a3db3e"
const updatedProduct = {name: "updated", description: "updated item"}

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

describe('Product Controller Get', () => { 
    test('should have a getProducts functions', () => { 
        expect(typeof productController.getProducts).toBe("function")
    })
    test('should call ProductModel.find({})', async () => { 
        await productController.getProducts(req,res,next)
        expect(productModel.find).toHaveBeenCalledWith({})
    })
    test('should return 200 status code', async () => { 
        await productController.getProducts(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })
    test('should return json body in response', async () => {  
        productModel.find.mockReturnValue(allProducts)
        await productController.getProducts(req,res,next)
        expect(res._getJSONData()).toStrictEqual(allProducts)
    })
    test('should handdle errors', async () => { 
        const errorMessage = {message: "Error finding product data"}
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.find.mockReturnValue(rejectedPromise)

        await productController.getProducts(req,res,next)
        expect(next).toBeCalledWith(errorMessage)
    })
})

describe('Product Controller GetById', () => {  
    test('should have a getProductById function', () => {  
        expect(typeof productController.getProductById).toBe("function")
    })
    test('should call ProductModel.findById', async () => { 
        req.params.productId = productId
        await productController.getProductById(req,res,next)

        expect(productModel.findById).toBeCalledWith(productId)
    })
    test('should return json body and status code 200', async () => {  
        productModel.findById.mockReturnValue(newProduct)
        await productController.getProductById(req,res,next);
        
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newProduct)
        expect(res._isEndCalled()).toBeTruthy()
    })
    test('should return 404 when the item do not exist', async () => { 
        productModel.findById.mockReturnValue(null)
        await productController.getProductById(req,res,next)

        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
    test('should handle errors', async () => { 
        const errorMessage = {message: "error"}
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.findById.mockReturnValue(rejectedPromise)

        await productController.getProductById(req, res, next)
        
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe('Product Controller Update', () => { 
    test('should have an updateProduct function', () => { 
        expect(typeof productController.updateProduct).toBe("function")
    })
    test('should call ProductModel.findByIdAndUpdate', async () => { 
        req.params.productId = productId
        req.body = updatedProduct
        await productController.updateProduct(req,res,next)

        expect(productModel.findByIdAndUpdate).toBeCalledWith(productId,updatedProduct,{new:true})
    })
    test('should return json body and status code 200', async () => {  
        productModel.findByIdAndUpdate.mockReturnValue(updatedProduct)
        req.params.productId = productId
        req.body = updatedProduct
        await productController.updateProduct(req,res,next);
        
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(updatedProduct)
        expect(res._isEndCalled()).toBeTruthy()
    })
    test('should return 404 when the item do not exist', async () => { 
        productModel.findByIdAndUpdate.mockReturnValue(null)
        await productController.updateProduct(req,res,next)

        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
    test('should handle errors', async () => { 
        const errorMessage = {message: "error"}
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)
        await productController.updateProduct(req,res,next)

        expect(next).toBeCalledWith(errorMessage)
    })
})