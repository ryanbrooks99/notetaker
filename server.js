// Dependencies
var express = require("express");
var path = require("path");
var dbJSON = require("./db/db.json")
var fs = require("fs");
var uuidv1 = require("uuid/v1");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function readFile() {
  var notes = JSON.parse(fs.readFileSync("db/db.json", "utf8")) || [];
  console.log(notes);
  return notes;
}
function writeFile(notes) {
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
}
//Setting up routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    
  });

  // Displays all notes
  app.get("/api/notes", function(req, res) {
    res.json(readFile());
  });
  
  app.post("/api/notes", function(req, res) {
    var notes = readFile();
    var title = req.body.title;
    var text = req.body.text;
    var newNote = {title, text, id:uuidv1()}
    notes.push(newNote);
    writeFile(notes);
    res.json(newNote);
  });

  app.delete("/api/notes/:id", function(req, res) {
    var notes = readFile();
    var filteredNotes = notes.filter(note => note.id !== req.params.id)
    writeFile(filteredNotes)
    res.json({"Ok": true})
  });

  
// Server listening...
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  })