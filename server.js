//express dependency 
const express = require("express");
const fs = require("fs");
const path = require("path");
// Tells node that we are creating an "express" server
const app = express();


// Sets an initial port. Will use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

//empty array for notes to be saved to 
// const noteInput;
// let noteData;
// let newNote;

//gets everything from db.json and pushes it to the page
app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data)
    {
        let noteData = JSON.parse(data)
        res.JSON(noteData);
    
    });
})

// pushes to db.json from the page
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let id = uuid.v4();
    newNote.id = `${id}`;
    notes.push(newNote);
    let saveNote = JSON.stringify(notes);
    console.log(saveNote);
    fs.writeFile(path.join(__dirname, "./db/db.json"),
      function(err) {
    {
        if (err) throw err;
       }
    });
        return res.JSON(newNote); 
    });

app.get("/api/notes", function(req,res) {
    
})
// route deleting

//unique uuid  if data === true 


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });