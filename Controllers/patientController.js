var patient = require('../Models/patient');
var User = require('../Models/user');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.add = function(data){
    
    let user = (({
        name, user, pwd, role
    }) => ({name, user, pwd, role}))(data.user);

    user.pwd = bcrypt.hashSync(user.pwd, config.salt);

    user = new User(user);

    // save new user to db
    user.save();
    data.user._id=user._id;
    patient.create(data);
}
exports.getAll = function(){
    return patient.find();
}
exports.getByDoctor = function(id){
    return patient.find({doctor: {_id : id}});
}
exports.getById = function(id) {
    return patient.findById(id);
}
exports.remove = function(id){
    return patient.findById(id);
}
exports.update = function(id,obj){
    patient.findByIdAndUpdate({_id : id},obj,function(err,doc){
    });
}
exports.setPendingSurveyOn = function(patient){
    if(patientState=='all')
    {
        var conditions = {  }
            , update = {pendingSurvey: true,}
            , options = { multi: true };
        patient.updateMany(conditions, update, options,(err, numAffected)=>{
            console.log(numAffected);
        });
        
           
    }
    else
    {
        var conditions = { risky : true }
            , update = {pendingSurvey: true,}
            , options = { multi: true };
        patient.updateMany(conditions, update, options,(err, numAffected)=>{
            console.log(numAffected);
        });
        
           
    }
    
}
exports.setPendingSurveyOff = function(id){
    var conditions = { _id : id }
    , update = {pendingSurvey: false}
    , options = { multi: false };
    patient.updateMany(conditions, update, options,(err, numAffected)=>{
        console.log(numAffected);
    });

}
exports.setAlertOn = function(){
    var conditions = { pendingSurvey: true }
    , update = {alert: true}
    , options = { multi: true };
    patient.updateMany(conditions, update, options,(err, numAffected)=>{
        console.log(numAffected);
    });

}
exports.setAlertOff = function(id){
    var conditions = { _id : id }
    , update = {alert: false}
    , options = { multi: false };
    patient.updateMany(conditions, update, options,(err, numAffected)=>{
        console.log(numAffected);
    });

}