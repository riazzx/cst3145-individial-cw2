const express = require('express')
var path = require('path')
var fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId

const app = express()
app.use(express.json())
app.set('port', 3000)
const port = 3000
let db

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

// logger middleware
app.use((req,res,next)=> {
    console.log("In comes a " + req.method + " request to" + req.url)
    next()
})


MongoClient.connect('mongodb+srv://riazzx:Riazzx.1121@cluster0.ygr7yjf.mongodb.net/?retryWrites=true&w=majority', (err,client) => {
    db = client.db('afterschool')
})

app.get('/', (req,res,next)=> {
    res.send("go to a collection, for ex. /collectionName")
})

app.param('collectionName', (req,res,next,collectionName) => {
    req.collection  = db.collection(collectionName)
    return next()
})

app.get('/collection/:collectionName', (req,res,next)=>{
    req.collection.find({}).toArray((e, results) =>{
        if (e) return next(e)
        res.send(results)
    })
})

// search
// app.get('/collection/:collectionName/:id', (req,res) => {
//     var search = req.params.id
//     console.log("searched for: " + search)

//     req.collection.find({})
// })

// post

// search with id

// put to update lesson spaces

// static file middleware
app.use(function(req,res, next) {
    var filePath = path.join(__dirname, "assets", req.url)
    fs.stat(filePath, function(err, fileInfo){
        if(err) {
            next()
            return
        }

        if(fileInfo.isFile()){
            res.sendFile(filePath)
        } else {
            next()
        }
    })
})

app.use(function(req,res){
    res.status(404)
    res.send("Error! File not found!")
})




app.listen(3000, ()=> {
    console.log(`Server listening on port ${port}`)
})