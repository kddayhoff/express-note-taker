//express dependency 
const express = require("express");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. Will use this later in our listener
const PORT = process.env.PORT || 3000;
///hellloooooo
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});