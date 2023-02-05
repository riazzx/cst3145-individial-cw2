const express = require('express')


const app = express()
app.use(express.json())
const port = 3000

app.use((req,res,next)=> {
    console.log("In comes a" + req.method + "request to" + req.url)
    next()
})

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})




app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})