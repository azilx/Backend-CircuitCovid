var patient = require('../Models/patient');
var User = require('../Models/user');
var bcrypt = require('bcryptjs');
var config = require('../config');
var mongoose = require('mongoose');
var Hospital = require('../Models/hospital');

exports.add = function(data){
    
    let user = (({
        name, user, pwd, role
    }) => ({name, user, pwd, role}))(data.user);

    let hospital = (({
        name,
        gouvernorat,
        delegation,
        type,
        adresse,
        codePostale
    }) => ({name, gouvernorat, delegation, type, adresse, codePostale }))(data.hospital);

    User.findOne({user: user.user}).then((doc) => {
        if (doc) {
            return Promise.reject({
                status: false,
                error: 'User has been already exist.'
            })

        } else {
            if(!data.hospital._id){
                user.pwd = bcrypt.hashSync(user.pwd, config.salt);
                user = new User(user);
                // save new user to db
                user.save();
                hospital = new Hospital(hospital);
                // save new user to db
                hospital.save();
                pat = new patient(data);
                pat.user={_id : user._id};
                pat.hospital={_id : hospital._id};
                pat.save();
            }
            else {
                user.pwd = bcrypt.hashSync(user.pwd, config.salt);
                user = new User(user);
                // save new user to db
                user.save();
                pat = new doctor(data);
                pat.user={_id : user._id};
                pat.save();
            }
            }
        });
};
exports.addMany = function(users){
    
    users.forEach(data => {
        let user = {
            name: data.name, user: data.name, pwd: data.name, role : "patient"
        }
    
        User.findOne({user: user.user}).then((doc) => {
            if (doc) {
                return Promise.reject({
                    status: false,
                    error: 'User has been already exist.'
                })
    
            } else {
                    user.pwd = bcrypt.hashSync(user.pwd, config.salt);
    
                    user = new User(user);
    
                    // save new user to db
                    user.save();
                    pat = new patient(data);
                    pat.user={_id : user._id}
                    pat.doctor={_id : mongoose.Types.ObjectId('4edd40c86762e0fb12000003')}
                    pat.save();
                }
            });
    });
};
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
    if(patient.patientState=='all')
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