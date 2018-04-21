"use strict"

const express = require('express');
const bodyParser = require('body-parser')
const {mongoCollectionsService} = require('./mongo/mongoCollectionsServices/mainMongoCollectionService');
const app = express()
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// Enable CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post("/mongoSearch", mongoCollectionsService)

app.listen(port, ()=>{
    console.log("Server started on port: ", port)
})