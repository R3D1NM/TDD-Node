const express = require('express')

// Constanst
const PORT = 5000;

// App
const app = express()

// Midlewares
app.use(express.json())

// Routes
const productRoutes = require('./routes')
app.use("/api/products",productRoutes)


app.listen(PORT)
console.log(`APPLICATION NOW RUNNING ON PORT:${PORT}`);