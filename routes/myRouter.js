// const { count } = require('console')
const express = require('express')
const rounter = express.Router()
// const part = require('path')
const Product = require('../models/products')

// upload file
const multer = require('multer')
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products') // ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg") //เปลี่ยนชื่อไฟล์ ป้องกันชื่อช้ำ
    }
})

// const indexPage = part.join(__dirname,"templates/index.html")
// app.get("/",(req,res)=>{
//     res.send("Hello Express.js")
// })

const upload = multer({
    storage:storage
})
rounter.get("/",async(req,res)=>{
    const name = 'tawatchai'
    const age = 20
    const address = '<h3>กรุงเทพ<h3>'
    // const products = [
    //     {name:"พัดลม",price:500,image:"images/products/product1.png"},
    //     {name:"เสื้อผ้า",price:2000,image:"images/products/product2.png"},
    //     {name:"หูฟัง",price:3000,image:"images/products/product3.png"},
    // ]
    // try {
    //     let doc = await Product.find({})
    //     res.render('index', {products:doc})
    // } catch (err) {
    //     console.log(err)
    // }

    await Product.find().exec().then(doc => 
        res.render('index',{products:doc})
    )
    .catch(function (err) {
        console.log("get /");
        console.log(err);
    });
    // res.render('index',{products:doc})
    // const indexPage = part.join(__dirname,"../templates/index.html")
    // res.status(200)
    // res.type('text/html')
    // res.sendFile(indexPage)

})

rounter.get("/addform",(req,res)=>{
    res.render('form.ejs')
})

rounter.get("/manage",(req,res)=>{
    Product.find().then(doc => 
        res.render('manage',{products:doc})
    )
    .catch(function (err) {
        console.log("get manage");
        console.log(err);
    });
    // res.render('manage.ejs')
})

rounter.post("/insert",upload.single("image"),(req,res)=>{
    // console.log(req.file)
    //GET
    // console.log(req.query)
    // console.log(req.query.name)
    //POST
    // console.log(req.body)
    // console.log(req.body.name)
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description,
    })

    // try {
    //     await Product.saveProduct(data)
    //     res.redirect('/')
    // } catch (err) {
    //     console.log(err)
    // }
    Product.saveProduct(data).then(()=> {
        // console.log(models);
        res.redirect('/')
    })
    .catch(function (err) {
        console.log("xxxxxxxxxxxxxxxxxxx insert");
        console.log(err);
    });
    // res.render('form.ejs')
})
rounter.get("/delete/:id",(req,res)=>{
    console.log("Delete id "+(req.params.id).trim())
    // Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
    //     res.redirect('/manage')
    // })
    Product.findByIdAndDelete((req.params.id).trim(),{useFindAndModify:false}).then(doc => 
        res.redirect('/manage')
    )
    .catch(function (err) {
        console.log("xxxxxxxxxxxxxxxxxxx delete");
        console.log(err);
    });
})

rounter.get("/:id",(req,res)=>{
    // console.log("Get id "+req.params.id)
    const product_id = (req.params.id).trim()
    Product.findOne({_id:product_id}).then(doc => 
        // console.log(doc)
        res.render('product',{products:doc})
    )
    .catch(function (err) {
        console.log("get id");

        console.log(err);
    });
})

rounter.post("/edit",(req,res)=>{
    // console.log("Getedit id "+req.body.edit_id)
    const product_id = (req.body.edit_id).trim()
    Product.findOne({_id:product_id}).then(doc => 
        // console.log(doc)
        res.render('edit',{product:doc})
    )
    .catch(function (err) {
        console.log("post edit");
        console.log(err);
    });
})

rounter.post('/update',(req,res)=>{
    // ข้อมูลใหม่ที่ถูกส่งมาจากฟอร์มแก้ไข
    const update_id = (req.body.update_id).trim()
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    // อัพเดตข้อมูล
    // Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
    //     res.redirect('/manage')
    // })
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).then(
        res.redirect('/manage')
    )
    .catch(function (err) {
        console.log("post update");
        console.log(err);
    });
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