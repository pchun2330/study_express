const express = require('express');
const app = express();
const engine = require('ejs-locals');
const fs = require('fs');

app.engine('ejs', engine);
app.set('views', './class-7');
app.set('view engine', 'ejs');

const data = fs.readFileSync('./class-7/posts.json');
const datas = JSON.parse(data);

app.get('/', function(req, res){
	res.render('homepage', { datas: datas });
});

app.get('/view', (req, res) => {
	
	const index = req.query.index;
	const posts = datas[index];
	
	// add index
	res.render('view', { posts: posts ,index});
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/new',(req,res)=>{
	res.render('new');
});

// create -> update that is all together
app.post('/update', (req, res) => {

	const title = req.body.title;
	const content = req.body.content;
	
	//update or new one or delete
	const index = req.body.index;
	const action = req.body.action;
	
	if(action == 'update'){
		datas[index].title = title ;
		datas[index].content = content;
		fs.writeFileSync('./class-7/posts.json', JSON.stringify(datas));
		res.render('update',{action});
	}
	else if(action == 'delete'){
		datas.splice(index,1);
		fs.writeFileSync('./class-7/posts.json', JSON.stringify(datas));
		res.render('update',{action});
	}
	else{
		datas.push({ "title": title, "content": content });
		fs.writeFileSync('./class-7/posts.json', JSON.stringify(datas));
		res.render('update',{action});
	}
	
})

//add edit post
app.get('/edit',(req, res) => {
	const index = req.query.index;
	const posts = datas[index];
	res.render('edit', { posts: posts ,index});
});

app.listen(3000);

app.use(express.static('./class-7/public'));