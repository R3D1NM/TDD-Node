const express = require('express')

// Constanst
const PORT = 5000;

// App
const app = express()

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT)
console.log(`APPLICATION NOW RUNNING ON PORT:${PORT}`);