"use strict"

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/campai";
const async = require('async')

const mongoCollectionsService = (req, res)=>{
    const orgsSearchTerm = {$or:[ {"name": req.body.orgs},{"city": req.body.orgs}, {"type": req.body.orgs}]};
    const contactsSearchTerm = {$or:[ {"first_name": req.body.contacts},{"last_name": req.body.contacts}]};
    const groupsSearchTerm = {"name": req.body.groups};

    MongoClient.connect(url, function(err, db) {
    const searchTermTotalResponse = {};
    const queries = [
        function(callback) {
            db.collection('orgs').find(orgsSearchTerm).toArray(function(err, orgs) {
                if (err || orgs.length === 0) return callback(err);
                searchTermTotalResponse.orgs = orgs;
                callback();
            });
        },
        function(callback) {
            db.collection('contacts').find(contactsSearchTerm).toArray(function(err, contacts) {
                if (err || contacts.length === 0) return callback(err);
                searchTermTotalResponse.contacts = contacts;
                db.collection('orgs').find({"_id": ObjectId(contacts[0].org)}).toArray(function(err, orgs) {
                    if (err) return callback(err);
                    searchTermTotalResponse.contacts.push({orgName: orgs[0].name});
                    callback();
                });
                
            });
        },
        function(callback) {
            db.collection('contactgroups').find(groupsSearchTerm).toArray(function(err, groups) {
                if (err || groups.length === 0) return callback(err);
                searchTermTotalResponse.groups = groups;
                callback();
            });
        }
    ];

    async.parallel(queries, function(err) { //This function gets called after the two queries have called their "task callbacks"
        if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
        // Here `searchTermTotalResponse` will be an object with `users` and `colors` keys
        // Example: `searchTermTotalResponse = {users: [...], colors: [...]}`
        db.close();
        res.send({response: searchTermTotalResponse});
    });
});
}

module.exports ={
    mongoCollectionsService,
}
