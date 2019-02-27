//const express = require('express')
const path= require('path')
const PORT = process.env.PORT || 5000
//const index_main=require('../index')


//express()
  ////.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
//  .get('/', (req, res) => res.sendFile('index.html'))
  //.get('/cool', (req, res) => res.send(cool()))
//  .listen(PORT)

var app= require('http').createServer(response)
var fs=require('fs')
//var http=require('http').Server(app);

app.listen(PORT)
console.log('app is running')

/*
app.get('/',function(req,res){
	
	res.sendFile(path.join(__dirname+'/index.html'))
	res.sendFile(path.join(__dirname+'/index.js'))
	//index_main()
	
})*/
function response(req,res){
	var file=""
	if(req.url == '/') {
		file=__dirname+'/index.html'
	}else{
		file=__dirname+req.url
	}

	fs.readFile(file,function(err,data){
		if(err) {
			res.writeHead(404)
			return res.end('PAGE NOT FOUND')
		}
	res.writeHead(200)
	res.end(data);
	});
}


