const config = require('../config');
var mongoose = require('mongoose');
const doctor = require('./doctor');
const user = require('./user');
const hospital = require('./hospital');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

mongoose.connect(config.db, {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var PatientSchema = new mongoose.Schema({
    
    pendingSurvey : Boolean,
    patientState : String,
    name: String,
    familyName: String,
    birthday: String,
    gender : {type: String , enum: ["Male", "Female"],required: false},
    email: String,
    cin: String,
    phone: String ,
    secondPhone: String,
    address: String,
    gouvernorat: String,
    nationality: String,
    risky : Boolean ,
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
            vomit: Boolean,
            headaches: Boolean,
            Rhinitis: Boolean,
            myalgia: Boolean,
            muscleSoreness: Boolean,
            abdominalPain: Boolean,
            odynophagia: Boolean
        }],
        distress: [{
            respiratoryDistress: Boolean,
            neurologicalDistress: Boolean,
            hemodynamicInstability: Boolean,
            metabolicEmergency: Boolean
        }],
        other: String
    }],
    symptomsStartDate: String,
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
            RenalFailure: Boolean,
            smoker: Boolean,
            pulmonaryPathology: Boolean,
            otherchronicPathologies: String
        }],
        usualTreatment: String,
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
        fr: {type: Number,  min: 0, max: 50},
        spo2: {type: Number, min: 30, max: 100},
        fio2: {type: Number,  min: 21, max: 100},
        pas: {type: Number,  min: 0, max: 30},
        pad: {type: Number,  min: 0, max: 20},
        fc: {type: Number,  min: 0, max: 300},
        gcs: {type: Number,  min: 3, max: 15},
        gad: {type: Number, min: 0.1, max: 6},
        temperatur : {type: Number,  min : 27, max: 43}, 
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
    pcr: String,
    datePcr: String,
    tdm: String,
    dateTdm:String,
    healthCareWorker: Boolean,
    localCase: Boolean,
    orientation: String,
    doctor :{type: doctor.schema, ref:'doctors'},
    user : {type:user.schema , ref:'User'},
    hospital : {type:hospital.schema , ref:'hospital'},
    treatment: [{ 
         hydroxycholoroquine: Boolean,
         chloroquine: Boolean,
         azithromycine: Boolean,
         paracetamol: Boolean,
         sintrom: Boolean,
         lopinavir: Boolean,
         oseltamivir: Boolean,
         corticoides: Boolean,
         vitC: Boolean,
         vitD: Boolean,
         zinc: Boolean,
         heparine: String,
         antibiotique: String,
         otherTreatment: String
     }]
});
module.exports =  mongoose.model('Patient',PatientSchema);
