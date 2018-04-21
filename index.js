"use strict"

const express = require('express');
const bodyParser = require('body-parser')
const {mongoCollectionsService} = require('./mongo/mongoCollectionsServices/mainMongoCollectionService');
const app = express()
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post("/mongoSearch", mongoCollectionsService)

app.listen(port, ()=>{
    console.log("Server started on port: ", port)
})