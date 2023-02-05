const express = require('express')
var path = require('path')
var fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId

const app = express()
app.use(express.json())
const port = 3000
let db

app.use((req,res,next)=> {
    console.log("In comes a" + req.method + "request to" + req.url)
    next()
})

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

MongoClient.connect('mongodb+srv://riazzx:Riazzx.1121@cluster0.ygr7yjf.mongodb.net', (err,client) => {
    db = client.db('webstore')
})







app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})