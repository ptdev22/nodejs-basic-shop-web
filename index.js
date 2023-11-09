const express = require('express')
const app = express()
const part = require('path')

app.use(express.static(part.join(__dirname,"public")))

app.listen(8080,()=>{
    console.log("start server in port 8080")
})