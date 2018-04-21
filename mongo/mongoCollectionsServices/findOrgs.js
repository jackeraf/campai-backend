module.exports = function findOrgs(orgsSearchTerm, searchTermTotalResponse, db, callback){
    db.collection('orgs').find(orgsSearchTerm).toArray(function(err, orgs) {
        if (err || orgs.length === 0) return callback(err);
        searchTermTotalResponse.orgs = orgs;
        callback();
    });
}
