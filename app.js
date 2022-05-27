const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const routes = require('./routes');
var cors = require('cors');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');

app.use(bodyParser.json());
//app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ limit: '50mb' }));

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

const connectString =
	'mongodb+srv://youtube:e17pk2110064@cluster0.hslb9.mongodb.net/customerDB?retryWrites=true&w=majority';
app.use(express.static('public'));

mongoose
	.connect(connectString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then((con) => {
		//console.log(con.connections);
		console.log('DB connection successful');
	});

app.use(routes);

app.all('*', (req, res, next) => {
	console.log('req', req.originalUrl);

	const err = new Error('cant find this route');
	err.status = 'fail';
	err.statusCode = 410;
	next(err);

	//res.status(404);
	// res.send({
	// 	status: 'fail',
	// 	message: `Can't find ${req.originalUrl} on this server`
	// });
});

app.use((err, req, res, next) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode);
	console.log(err);

	res.send({
		status: 'fail',
		err: err.message
	});
});

app.listen(5000, function() {
	console.log('Server started on port 5000');
});
