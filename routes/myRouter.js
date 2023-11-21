const { count } = require('console')
const express = require('express')
const rounter = express.Router()
const part = require('path')


// const indexPage = part.join(__dirname,"templates/index.html")
// app.get("/",(req,res)=>{
//     res.send("Hello Express.js")
// })

rounter.get("/",(req,res)=>{
    // const indexPage = part.join(__dirname,"../templates/index.html")
    // res.status(200)
    // res.type('text/html')
    // res.sendFile(indexPage)
    const name = 'tawatchai'
    const age = 20
    const address = '<h3>กรุงเทพ<h3>'
    const products = [
        {name:"พัดลม",price:500,image:"images/products/product1.png"},
        {name:"เสื้อผ้า",price:2000,image:"images/products/product2.png"},
        {name:"หูฟัง",price:3000,image:"images/products/product3.png"},
    ]
    res.render('index.ejs',{name:name,age:age,address:address,products:products})
})

rounter.get("/addform",(req,res)=>{
    res.render('form.ejs')
})

rounter.get("/manage",(req,res)=>{
    res.render('manage.ejs')
})

rounter.post("/insert",(req,res)=>{
    //GET
    // console.log(req.query)
    // console.log(req.query.name)
    //POST
    // console.log(req.body)
    // console.log(req.body.name)
    res.render('form.ejs')
})
// rounter.get("/product/:id",(req,res)=>{
//     const productId = req.params.id
//     // res.send(`<h1>Product ${productId}</h1>`)
//     if(productId ==="1"){
//         res.status(200)
//         res.type('text/html')
//         res.sendFile(part.join(__dirname,"../templates/product1.html"))
//     }else if(productId ==="2"){
//         res.status(200)
//         res.type('text/html')
//         res.sendFile(part.join(__dirname,"../templates/product2.html"))
//     }else if(productId ==="3"){
//         res.status(200)
//         res.type('text/html')
//         res.sendFile(part.join(__dirname,"../templates/product3.html"))
//     }else{
//         // res.status(404)
//         // res.send("<h1>404 Page Not found<h1>")
//         res.redirect("/")
//     }

// })

module.exports = rounter