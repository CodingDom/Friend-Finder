const friends = require("../data/friends.js");

module.exports = function(app) {
    // Sends list of all stored friends
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // Storing data within friends
    app.post("/api/friends", function(req, res) {
        friends.push(req.body);
        res.json({status: 200, complete : true});
    });
};