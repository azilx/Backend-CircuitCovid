var survey = require('../Models/survey');
var patient = require('../Models/patient');


exports.add = function(data){
    newSurvey=new survey(data);
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