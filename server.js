//express dependency 
const express = require("express");
const fs = require("fs");
const path = require("path");
// Tells node that we are creating an "express" server
const app = express();
const uuid = require("uuid");

// Sets an initial port. Will use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// this connects our htmlRoutes and apiRoutes files to server.js
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });