const express = require('express');
const app = express();
const engine = require('ejs-locals');
const fs = require('fs');

app.engine('ejs', engine);
app.set('views', './class-4');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  const data = fs.readFileSync('./class-4/posts.json');

  const datas = JSON.parse(data);

  res.render('homepage', { datas: datas });
});

app.listen(3000);

//add style.css
app.use(express.static('./class-4/public'));