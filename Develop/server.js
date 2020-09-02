
var express = require("express");
var path = require("path");
var dbJSON = require("./db/db.json")
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    res.json(dbJSON);
  });
  
  app.post("/api/notes", function(req, res) {
    
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });  

  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  })