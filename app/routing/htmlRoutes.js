const path = require("path");

module.exports = function(app) {
    // Opens up the survey taking page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // Sending the assets folder containing front end css, javascript, and images
    app.get("/assets:file", function(req, res) {
        res.sendFile(__dirname, "../public/assets/"+req.params.file);
    });

    // Setting default page to home.html
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};