const uuidv4 = require("uuid/v4");
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
let noteData = require("../db/db.json");

module.exports = function(app) {

  // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function(req, res) {
    // console.log(res.notes);
    // let getNotesFromServer = JSON.parse(fs.readFileSync("./db/db.json", {encoding: "utf8"})); /* Inside the get function */
    res.json(noteData);
  });


  app.post("/api/notes", function(req, res) {
    // console.log(res.notes);

    let note = req.body;
    let id = uuidv4();
    note.id = id;
    
    noteData.push(note);
    let returnNotesToServer = JSON.stringify(noteData);
    writeFileAsync("./db/db.json", returnNotesToServer) 
    .then (function () {
      res.json(note);
    })
    .catch( function(error){
      console.log(error);
    })
      
  });



  // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
  //write file async - if true, for loop write to array that DO NOT match, noteData === keepNotes, then writefileAsync
app.delete('/api/notes', function (req, res) {
  res.send('Got a DELETE request at /user')
})
};
