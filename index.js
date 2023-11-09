const express = require('express')
const rounter = require('./routes/myRouter')
const app = express()

app.use(rounter)
app.listen(8080,()=>{
    console.log("start server in port 8080")
})