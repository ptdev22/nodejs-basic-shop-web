const express = require('express')
const rounter = express.Router()
const part = require('path')


// const indexPage = part.join(__dirname,"templates/index.html")
// app.get("/",(req,res)=>{
//     res.send("Hello Express.js")
// })

rounter.get("/",(req,res)=>{
    const indexPage = part.join(__dirname,"../templates/index.html")
    res.status(200)
    res.type('text/html')
    res.sendFile(indexPage)
})

rounter.get("/product/:id",(req,res)=>{
    const productId = req.params.id
    // res.send(`<h1>Product ${productId}</h1>`)
    if(productId ==="1"){
        res.status(200)
        res.type('text/html')
        res.sendFile(part.join(__dirname,"../templates/product1.html"))
    }else if(productId ==="2"){
        res.status(200)
        res.type('text/html')
        res.sendFile(part.join(__dirname,"../templates/product2.html"))
    }else if(productId ==="3"){
        res.status(200)
        res.type('text/html')
        res.sendFile(part.join(__dirname,"../templates/product3.html"))
    }else{
        // res.status(404)
        // res.send("<h1>404 Page Not found<h1>")
        res.redirect("/")
    }

})

module.exports = rounter