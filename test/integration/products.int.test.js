const request = require('supertest')
const app = require('../../server')

const newProduct = require('../data/new-product.json')
let firstProduct

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

test('GET /api/products',async() => { 
    const response = await request(app)
    .get('/api/products')

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body[0].name).toBeDefined()
    expect(response.body[0].description).toBeDefined()
    firstProduct = response.body[0]
})

test('GET /api/products/:productId', async () =>{
    const response = await request(app)
    .get(`/api/products/${firstProduct._id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(firstProduct.name)
    expect(response.body.description).toBe(firstProduct.description)
})

test('GET id do not exist /api/products/:productID', async () => { 
    const response = await request(app)
    .get('/api/products/65cf42a5ae125c8f3efc9f00')

    expect(response.statusCode).toBe(404)
})

test('PUT /api/products/:productId', async () => { 
    const response = await request(app)
    .put(`/api/products/${firstProduct._id}`)
    .send({name: "updated", description: "updated item"})

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe("updated")
    expect(response.body.description).toBe("updated item")
})

test('PUT id do not exist /api/products/:productID', async () => { 
    const response = await request(app)
    .put('/api/products/65cf42a5ae125c8f3efc9f00')
    .send({name: "updated", description: "updated item"})

    expect(response.statusCode).toBe(404)
})