"use strict"

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/campai";
const async = require('async')

const findOrgs = require("./findOrgs")
const findContacts = require("./findContacts")
const findContactGroups = require("./findContactGroups")

const mongoCollectionsService = (req, res)=>{
    const orgsSearchTerm = {$or:[ {"name": req.body.orgs},{"city": req.body.orgs}, {"type": req.body.orgs}]};
    const contactsSearchTerm = {$or:[ {"first_name": req.body.contacts},{"last_name": req.body.contacts}]};
    const groupsSearchTerm = {"name": req.body.groups};

    MongoClient.connect(url, function(err, db) {
    const searchTermTotalResponse = {};
    const queries = [
        function(callback) {
          return findOrgs(orgsSearchTerm,searchTermTotalResponse, db, callback)     
        },
        function(callback) {
          return findContacts(contactsSearchTerm,searchTermTotalResponse, db, callback )
        },
        function(callback) {
           return findContactGroups(groupsSearchTerm,searchTermTotalResponse, db, callback )
        }
    ];

    async.parallel(queries, function(err) { 
        if (err) return next(err); 
        db.close();
        res.send({response: searchTermTotalResponse});
    });
});
}

module.exports ={
    mongoCollectionsService,
}
