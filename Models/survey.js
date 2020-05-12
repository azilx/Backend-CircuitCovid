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
    name : String,
    date : Date,
    dyspnea : Boolean,
    chestPain : Boolean, 
    cough : Boolean,
    asthenia : Boolean,
    ageusia : Boolean,
    anosmia : Boolean,
    nausea : Boolean,
    diarrhea : Boolean,
    vomit : Boolean,
    respiratoryDistress : Boolean,
    headache : Boolean,
    myalgia : Boolean,
    confusion : Boolean,
    rhinitis : Boolean,
    abdominalPain: Boolean,
    odynophagia: Boolean,
    temperatur : {type: Number,  min : 27, max: 43}, 
    pas: {type: Number,  min: 0, max: 30},
    pad: {type: Number,  min: 0, max: 20},
    doctor : {type:doctor.schema , ref:'Doctor'},
    patient : {type:patient.schema , ref:'Patient'}
});
module.exports =  mongoose.model('Survey',SurveySchema);
