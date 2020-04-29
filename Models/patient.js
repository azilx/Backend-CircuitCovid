const config = require('../config');
var mongoose = require('mongoose');
const doctor = require('./doctor');
const user = require('./user');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

mongoose.connect(config.db, {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var PatientSchema = new mongoose.Schema({
    pendingSurvey : Boolean,
    patientState : String,
    name: {type: String ,required: true},
    age: {type: Number ,required: true},
    gender : {type: String , enum: ["Male", "Female"],required: true},
    email: String,
    cin: {type: String ,required: true},
    phone: {type: String ,required: true},
    address: {type: String, required: true},
    risky : Boolean ,
    pendingSurvey : Boolean,
    alert : Boolean,
    reasonForHospitalisation: [{
        symptoms: [{
            dyspnea: Boolean,
            chestPain: Boolean,
            fever: Boolean,
            asthenia: Boolean,
            anosmia: Boolean,
            ageusia: Boolean,
            cough: Boolean,
            expectoration: Boolean,
            confusion: Boolean,
            diarrhea: Boolean,
            aeg: Boolean,
            nausea: Boolean,
            vomit: Boolean
        }],
        distress: [{
            respiratoryDistress: Boolean,
            neurologicalDistress: Boolean,
            hemodynamicInstability: Boolean,
            metabolicEmergency: Boolean
        }]
    }],
    symptomsStartDate: {type: Date,required: true},
    firstSymptoms: String,
    background: [{
        chronicPathologies: [{
            hta: Boolean,
            diabetes: Boolean,
            acFa: Boolean,
            heartFailure: Boolean,
            CoronaryArtery: Boolean,
            bpco: Boolean,
            asthma: Boolean,
            ischemicStroke: Boolean,
            hemorrhagicStroke: Boolean,
            hemodialysis: Boolean,
            immunosuppression: Boolean,
            generalIllness: Boolean,
            activeCancer: Boolean,
            RenalFailure: Boolean
        }],
        usualTreatment: {type: String, required: true},
        recentTreatment: [{
            ains: Boolean,
            corticotherapy: Boolean,
            immunosuppressant: Boolean,
            chemotherapy: Boolean
        }]
    }],
    typeOfContact: [{
        originFromAnEndemicArea: Boolean,
        contactWithAPositiveCovid: Boolean,
        ContactWithASuspectedCase: Boolean,
        respectForIsolation: Boolean,
        familyMembers: Number
    }],
    consultation: [{
        fr: {type: Number, required: true, min: 0, max: 50},
        spo2: {type: Number, required: true, min: 30, max: 100},
        fio2: {type: Number,  min: 21, max: 100},
        pas: {type: Number, required: true, min: 0, max: 30},
        pad: {type: Number, required: true, min: 0, max: 20},
        fc: {type: Number, required: true, min: 0, max: 300},
        gcs: {type: Number, required: true, min: 3, max: 15},
        gad: {type: Number, min: 0.1, max: 6},
        spo2: {type: Number, required: true, min: 30, max: 100},
        sous: [{
            nad: Boolean,
            dob: Boolean,
            adr: Boolean,
            seduced: Boolean,
            signsOfStruggles: Boolean,
            coldEnds: Boolean,
            marbrure: Boolean,
            fine: Number,
            igs2: Number,
            sofa: Number
        }]
    }],
    doctor :{type: doctor.schema, ref:'doctors'},
    user : {type:user.schema , ref:'User'}
});
module.exports =  mongoose.model('Patient',PatientSchema);