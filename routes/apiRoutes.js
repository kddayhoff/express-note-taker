const dataBase = require("../db/db.json");


module.exports = function(app) {
 

  app.get("/api/notes", function(req, res) {
    res.json(dataBase);
  });
  
  app.post("/api/notes", function(req, res) {  
    res.json(dataBase);
  });

};
