const express = require('express');
const app = express();
const engine = require('ejs-locals');
const fs = require('fs');

app.engine('ejs', engine);
app.set('views', './class-5');
app.set('view engine', 'ejs');

const data = fs.readFileSync('./class-5/posts.json');
const datas = JSON.parse(data);

app.get('/', function(req, res){
	

	res.render('homepage', { datas: datas });
});

//use node to fixed url value
app.get('/view', (req, res) => {
	
	const index = req.query.index;

	const posts = datas[index];

	res.render('view', { posts: posts });
});

app.listen(3000);

app.use(express.static('./class-5/public'));