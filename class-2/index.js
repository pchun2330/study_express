/*
use node.js and express to read HTML File
*/

const express = require('express');
const app = express();

//ejs is common 「 model engine 」 kit in js social
const engine = require('ejs-locals');

//set model engine
app.engine('ejs', engine);
app.set('views', './class-2');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  // model engine's file name
  res.render('homepage');
});

app.listen(3000);