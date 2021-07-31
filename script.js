const express=require("express");
const app = express();
const fs=require("fs");
const path=require("path");
const hbs=require("hbs");
const port = process.env.PORT || 8000;
// absolute paths 

let staticpath=path.join(__dirname,"./hbs/main");
let main=path.join(__dirname,"./hbs/main");
let partialspath=path.join(__dirname,"./hbs/partials");


// absolute paths 

app.use(express.static(staticpath));


// set templae engine 
app.set("view engine","hbs");
app.set("views",main);
hbs.registerPartials(partialspath);
// set templae engine 

app.get("/",(req,res)=>{
   res.render("index");
   

});
app.get("/about",(req,res)=>{
   res.render("about");
   

});
app.get("/weather",(req,res)=>{
   res.render("weather");
   

});






app.listen(port,(err)=>{
console.log("listeng at port no 8000");
});