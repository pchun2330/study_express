const express = require('express');
const app = express();

app.get('/' , function(req,res){
	res.send('<h1>我的個人日記APP<h1>');
});

app.listen(3000);