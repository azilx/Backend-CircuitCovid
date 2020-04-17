var survey = require('../Models/survey');
var schedule = require('node-schedule');
exports.add = function(data){
    survey.create(data);
}
exports.getAll = function(){
    return survey.find();
}
exports.getById = function(id) {
    return survey.findById(id);
}
exports.remove = function(id){
    return survey.findById(id);
}
exports.update = function(id,obj){
    survey.findByIdAndUpdate({_id : id},obj,function(err,doc){
        
    });
}