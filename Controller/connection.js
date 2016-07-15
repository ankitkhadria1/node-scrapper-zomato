//require mongoose node module
var mongoose = require('mongoose');

//connect to local mongodb database
var db = mongoose.connect('mongodb://localhost:27017/adurcup');

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});
