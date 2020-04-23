const { v4: uuidv4 } = require('uuid');
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const readfileAsync = util.promisify(fs.readFile);
let noteData = require("../db/db.json");

module.exports = function(app) {

  // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function(req, res) {
  
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

  //write file async - if true, for loop write to array that DO NOT match, noteData === keepNotes, then writefileAsync

  //run for loop that goes through db.json data, looks for all the data that ISN"T selected by the user, write that to a new array then push to db.json using writefileasync
app.delete('/api/notes/:id', function (req, res) {

  // let id = uuidv4();
  // note.id = id;
  console.log("This is sorta working")
  

  // let readNotes = JSON.parse(noteData);
 
  readfileAsync("./db/db.json", noteData)
  .then (function () {
    res.json(noteData);
    
  })
  
  // for (let i = 0; i < deleteNote.length; i++);
  // if ( noteData === true) {
   
  // }
//use promisify to readfile
  
})
};
