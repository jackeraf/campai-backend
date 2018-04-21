module.exports = function findContactGroups(groupsSearchTerm,searchTermTotalResponse, db, callback ){
    db.collection('contactgroups').find(groupsSearchTerm).toArray(function(err, groups) {
        if (err || groups.length === 0) return callback(err);
        searchTermTotalResponse.groups = groups;
        callback();
    });
}