const express = require('express')
const app = express()
const part = require('path')
const rounter = require('./routes/myRouter')
const coolieParser = require('cookie-parser')

app.set('views',part.join(__dirname,'views'))
app.set('view engine','ejs')
// post data
app.use(express.urlencoded({extended:false}))
app.use(coolieParser())
app.use(rounter)
app.use(express.static(part.join(__dirname,"public")))

app.listen(8080,()=>{
    console.log("start server in port 8080")
    console.log("start server in http://localhost:8080/")
})