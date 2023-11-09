const http = require('http')
const fs = require('fs')
const url = require('url')

const indexPage = fs.readFileSync(`${__dirname}/templates/index.html`)
const productPage1 = fs.readFileSync(`${__dirname}/templates/product1.html`)
const productPage2 = fs.readFileSync(`${__dirname}/templates/product2.html`)
const productPage3 = fs.readFileSync(`${__dirname}/templates/product3.html`)

const server = http.createServer(function(req,res){
    // console.log(url.parse(req.url,true))
    // const pathName = req.url
    const {pathname,query} = url.parse(req.url,true)
    // console.log("url : ",pathName)
    // console.log("dir : ",__dirname)
    // const myhtml=`
    // <h1>hello nodeJS</h1>
    // <p style="color:blue;" >tawatchai</p>
    // pathName = ${pathName}
    // `
    // res.writeHead(201)
    // res.write(myhtml)
    if (pathname =="/" || pathname =="/homepage") {
        // console.log(query.id)
        res.end(indexPage)
    }else if(pathname =="/product") {
        // console.log(query.id)
        if (query.id === "1"){
            res.end(productPage1)
        }else if(query.id === "2"){
            res.end(productPage2)
        }else if(query.id === "3"){
            res.end(productPage3)
        }else{
            res.writeHead(404)
            res.end("<h1>Not found<h1>")
        }
    }else{
        res.writeHead(404)
        res.end("<h1>Not found<h1>")
    }

})
server.listen(80,()=>{
    console.log("start server in port 80")
})