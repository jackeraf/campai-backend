"use strict"

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/campai";
const async = require('async')

const findOrgs = require("./findOrgs")
const findContacts = require("./findContacts")
const findContactGroups = require("./findContactGroups")

const mongoCollectionsService = (req, res)=>{
    const orgSearchTerm = req.body.orgs;
    const orgRegex = new RegExp(".*" + orgSearchTerm + ".*", "i");
    const contactsSearchTerm = req.body.contacts;
    const contactsRegex = new RegExp(".*" + contactsSearchTerm + ".*", "i");
    const groupsSearchTerm = req.body.groups;
    const groupsRegex = new RegExp(".*" + groupsSearchTerm + ".*", "i");
    
    const orgsMongoQuery = {$or:[ {"name": orgRegex},{"city": orgRegex}, {"type": orgRegex}]};
    const contactsMongoQuery = {$or:[ {"first_name": contactsRegex},{"last_name": contactsRegex}]};
    const groupsMongoQuery = {"name": groupsRegex};

    MongoClient.connect(url, function(err, db) {
    const searchTermTotalResponse = {};
    const queries = [
        function(callback) {
          return findOrgs(orgsMongoQuery,searchTermTotalResponse, db, callback)     
        },
        function(callback) {
          return findContacts(contactsMongoQuery,searchTermTotalResponse, db, callback )
        },
        function(callback) {
           return findContactGroups(groupsMongoQuery,searchTermTotalResponse, db, callback )
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
