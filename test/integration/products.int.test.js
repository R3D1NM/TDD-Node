const request = require('supertest')
const app = require('../../server')

const newProduct = require('../data/new-product.json')

test('POST /api/products', async() => { 
    const response = await request(app)
        .post("/api/products")
        .send(newProduct)

    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
})

test('should return 500 on POST /api/products when required property missing', async () => { 
    const response = await request(app)
    .post("/api/products")
    .send({name: "Phone"})

    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({message:"Product validation failed: description: Path `description` is required."})
})