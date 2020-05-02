var survey = require('../Models/survey');
var patient = require('../Models/patient');


exports.add = function(data){
    patient.findOneAndUpdate({_id : data.patient._id},{pendingSurvey: false});
    newSurvey=new survey(data);
    newSurvey.patient={_id : data.patient._id}
    newSurvey.save();
}
exports.getAll = function(){
    return survey.find();
}
exports.getById = function(id) {
    return survey.findById(id);
}
exports.getByPatient = function(id){
    return survey.find({patient: {_id : id}});
}
exports.remove = function(id){
    return survey.findById(id);
}
exports.update = function(id,obj){
    survey.findByIdAndUpdate({_id : id},obj,function(err,doc){
        
    });
}