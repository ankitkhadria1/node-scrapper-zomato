var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var scrapper = require('./Controller/scrapper');
var path =require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/',function(req,res)
{
	res.render('ankit.jade');
});

app.get('/get_restaurant_zomato',scrapper.getRestaurant);
app.get('/get_restaurant_database',scrapper.getRestaurantDetails);

var server = require("http").createServer(app);
// Start server
server.listen(8083, function() {
	server.timeout = 9000000;
	console.log("Express server listening on 8083 mode");
});