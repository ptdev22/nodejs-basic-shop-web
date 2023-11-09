const express = require('express')
const part = require('path')
const app = express()


const indexPage = part.join(__dirname,"templates/index.html")

// app.get("/",(req,res)=>{
//     res.send("Hello Express.js")
// })

app.get("/",(req,res)=>{
    res.status(200)
    res.type('text/html')
    res.sendFile(indexPage)
})

app.get("/product",(req,res)=>{
    res.send("<h1>Hello product</h1>")
})
app.listen(8080,()=>{
    console.log("start server in port 8080")
})