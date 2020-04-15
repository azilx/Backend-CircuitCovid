const config = require('../config');
var mongoose = require('mongoose');
const user = require('./user');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

mongoose.connect(config.db, {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var DoctorSchema = new mongoose.Schema({
    name : String ,
    cin: String ,
    user : {type:user.schema , ref:'User'}
});
module.exports =  mongoose.model('Doctor',DoctorSchema);