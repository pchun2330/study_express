const express = require('express');
const app = express();
const engine = require('ejs-locals');
const fs = require('fs');

app.engine('ejs', engine);
app.set('views', './class-6');
app.set('view engine', 'ejs');

const data = fs.readFileSync('./class-6/posts.json');
const datas = JSON.parse(data);

app.get('/', function(req, res){
	res.render('homepage', { datas: datas });
});

app.get('/view', (req, res) => {
	
	const index = req.query.index;

	const posts = datas[index];

	res.render('view', { posts: posts });
});

//add to create new item
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/new',(req,res)=>{
	res.render('new');
});

app.post('/create', (req, res) => {
	const fs = require('fs');
	const title = req.body.title;
	const content = req.body.content;
	datas.push({ "title": title, "content": content });
	fs.writeFileSync('./class-6/posts.json', JSON.stringify(datas));
	res.render('create');
})


app.listen(3000);

app.use(express.static('./class-6/public'));