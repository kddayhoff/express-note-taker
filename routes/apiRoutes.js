const { v4: uuidv4 } = require('uuid');
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
let noteData = require("../db/db.json");
const path = require("path");

module.exports = function(app) {

//
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

 app.delete('/api/notes/:id', function (req, res) {

  
    fs.readFile(path.join(__dirname, '../db/db.json'), function(err, data) {
     if (err) throw err;
       let notes = JSON.parse(data)
       let deletedNote = notes.splice(req.params.id, 1)

       console.log("===========")
       console.log("this is the deleted data " + deletedNote)
       console.log("===============")
       console.log("This should be the saved data " +notes);
       
       fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes),    
      function (err, data) {
       
        if (err) throw err;
        res.send();
      })
     })
   })
 }



