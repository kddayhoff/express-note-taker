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
const notes = []

//gets everything from db.json
app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data)
    {
        test = JSON.parse(data)
        res.JSON(test);
    
    });
})

app.post("/api/notes", function(req, res) {
    fs.writeFile(path.join(__dirname, "./db/db.json"), function (err, data)
    {
        test = JSON.stringify(data)
        res.JSON(test); 
    });
})

// route deleting




app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });