var express = require ('express'),
	mongodb = require ('mongodb'),

	app = express(),
	bodyParser = require('body-parser'), //get data from browser
	validator = require('express-validator'), //validate input
	logger = require('morgan'), //morgan logger
	errorHandler = require('errorhandler'), //error handler midleware
	compression = require('compression'), //gzip requsts and responses

	url = 'mongodb://localhost:27017/reactdb'  //connection string to MongoDB


mongodb.MongoClient.connect(url, function (err, db) {

	if (err) {
		console.error (err)
		procesdds.exit(1)  // check if error
	}
	
	app.use(bodyParser.urlencoded({extended: true})) // parse incoming requests
	app.use(bodyParser.json()) 
	app.use(compression())  //middleware functions
	app.use(logger('combined'))  //logger combined
	app.use(errorHandler()) //

	app.use(validator())  // validate requests
	app.use(express.static('public')) // middleware to serve static files public

	app.use(function(req,res,next){
		req.messages = db.collection('messages')
		console.log(req.messages)
		return next()
	})

//APP GET	
	app.get('/messages', function(req,res,next){

		req.messages.find({}, {sort: {id: -1}}).toArray(function(err, docs){
			if (err) return next(err)
				return res.json(docs) 

 		})
	})
//APP POST

	app.post('/messages', function(req,res, next){
		//console.log('REQUESTS:'+req)
		//console.log('response:', res)
		//req.checkBody('message', 'Invalid message in body').notEmpty().isAlphanumeric()
		//req.checkBody('name', 'Invalid name in body').notEmpty().isAlphanumeric()
		if (errors) return next(errors)
		req.messages.insert(req.body, function (err, result){
			if (err) return next (err)
			return res.json(result.ops[0])
		})
	})

	app.listen(5000)
	console.log ('running node on:')
})