// require and define som stuff bcuz u have to homie
const express		= require('express');
const MongoClient	= require('mongodb').MongoClient;
const bodyParser 	= require('body-parser');
const db 			= require('./config/db');

const app 			= express();
const port 			= 8080;

// include body parsing stuff because it is stUPID
app.use(bodyParser.urlencoded({ extended: true }));

//todo: maybe make this dynamic maybe
app.use('/', express.static(__dirname + '/public'));

// connect to db, if successful, run application
MongoClient.connect(db.url, (err, database) => {
	if (err) return console.log(err);
	require('./app/routes')(app, database)

	app.listen(port, () => {
		console.log('Live @ ' + port);
	})
});