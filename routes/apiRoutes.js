const { v4: uuidv4 } = require('uuid');
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const readfileAsync = util.promisify(fs.readFile);
let noteData = require("../db/db.json");
const path = require("path");

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

  console.log("I am a fig tree")
  // console.log(req.params.id);
  
  fs.readFile(path.join(__dirname, '../db/db.json'), function(err, data) {
    if (err) throw err;
    console.log(data);
    deleteNote = JSON.parse(data)
    deleteNote.splice(req.params.id, 1)

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(deleteNote),function (err, data) {
      if (err) throw err;
      res.send();
  })




    // let returnNotesToServer = JSON.stringify(noteData);
    
    // writeFileAsync("./db/db.json", returnNotesToServer) 
    // .then (function () {
    //   res.send(noteData);
    // })
    // .catch( function(error){
    //   console.log(error);
    
    // });

  })
})
}


  

  

 
  
  // for (let i = 0; i < noteData.length; i++);
  // if ( noteData.id === note) {
  //   delete note;
  //  let returnNotesToServer = JSON.stringify(noteData);
  //   writeFileAsync("./db/db.json", returnNotesToServer) 
  //   .then (function () {
  //     res.json(note);
  //   })
  //   .catch( function(error){
  //     console.log(error);
  //   })

