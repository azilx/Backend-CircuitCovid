const config = require('../config');
var mongoose = require('mongoose');
const doctor = require('./doctor');
const patient = require('./patient');
// Get Mongoose to use the global promise library
//aaaa
mongoose.Promise = global.Promise;

mongoose.connect(config.db, {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var SurveySchema = new mongoose.Schema({
    name : String ,
    questions : [String],
    answers : [String],
    date : Date,
    doctor : {type:doctor.schema , ref:'Doctor'},
    patient : {type:patient.schema , ref:'Patient'},
});
module.exports =  mongoose.model('Survey',SurveySchema);