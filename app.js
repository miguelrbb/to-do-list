const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

let newToDos = [];
let workToDos = [];

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("es-ES", options);
  
  res.render("list", {listTitle: day, newToDos: newToDos});

});

app.post("/", function(req, res) {
  let item = req.body.newToDo;
  
  if (item == "" || item == " " || item == null) {

  } else {
    if (req.body.list === "Work") {
      workToDos.push(item);
      res.redirect("/work");
    } else {
      newToDos.push(item);
      res.redirect("/");
    }
    
  }
  
});


app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work list", newToDos: workToDos});
})

app.post("/work", function(req, res) {
  console.log(req.body);
  let item = req.body.newToDo;
  workToDos.push(item);
  res.redirect("/work");
})

app.post("/404", function(req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Port listening");
})