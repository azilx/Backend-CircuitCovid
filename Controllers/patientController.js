var patient = require('../Models/patient');

exports.add = function(data){
    patient.create(data);
}
exports.getAll = function(){
    return patient.find();
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