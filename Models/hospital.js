const config = require('../config');
var mongoose = require('mongoose');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

mongoose.connect(config.db, {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var hospitalSchema = new mongoose.Schema({
    name : String ,
});
module.exports =  mongoose.model('hospital',hospitalSchema);