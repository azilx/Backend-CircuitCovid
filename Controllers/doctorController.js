var doctor = require('../Models/doctor');
exports.add = function(data){
    doctor.create(data);
}
exports.getAll = function(){
    return doctor.find();
}
exports.getById = function(id) {
    return doctor.findById(id);
}
exports.remove = function(id){
    return doctor.findById(id);
}
exports.update = function(id,obj){
    doctor.findByIdAndUpdate({_id : id},obj,function(err,doc){
        
    });
}