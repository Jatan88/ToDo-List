

const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");

const app = express();

const items = [];
const workItems = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  const today = new Date();
 
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  const day = today.toLocaleDateString("en-US",options);

  res.render('list', {listTitle: day, newListItems: items});

});

app.post('/', function(req, res){
 const item = req.body.newItem;

 if (req.body.list === "Work"){
  workItems.push(item);
  res.redirect("/work");
 }else{
  items.push(item);
  
  res.redirect("/");
 }
  
 
})


app.get('/work', function(req, res){
  res.render('list', {listTitle: "Work List", newListItems: workItems});

})


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
