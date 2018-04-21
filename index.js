"use strict"

const express = require('express');
const bodyParser = require('body-parser')
const {mongoCollectionsService} = require('./mongo/mongoCollectionsService');
const app = express()
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post("/orgs", mongoCollectionsService)

app.listen(port, ()=>{
    console.log("Server started on port: ", port)
})