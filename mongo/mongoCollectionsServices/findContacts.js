const ObjectId = require('mongodb').ObjectID;

module.exports = function findContacts(contactsSearchTerm,searchTermTotalResponse, db, callback ){
    db.collection('contacts').find(contactsSearchTerm).toArray(function(err, contacts) {
        if (err || contacts.length === 0) return callback(err);
        searchTermTotalResponse.contacts = contacts;
        db.collection('orgs').find({"_id": ObjectId(contacts[0].org)}).toArray(function(err, orgs) {
            if (err) return callback(err);
            searchTermTotalResponse.contacts.push({orgName: orgs[0].name});
            callback();
        });
        
    });
}