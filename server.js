const express = require('express')
require("dotenv").config();

// Constanst
const PORT = 5000;

// App
const app = express()

// Midlewares
app.use(express.json())

// Routes
const productRoutes = require('./routes')
app.use("/api/products",productRoutes)

// Database
const mongoose = require('mongoose')
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@movieweb.nvzwk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(dbURI).then(() => console.log('[DATABASE] CONNECTED')).catch(() => console.log('[DATABASE] CONNECTION FAILED'))


app.listen(PORT)
console.log(`APPLICATION NOW RUNNING ON PORT:${PORT}`);