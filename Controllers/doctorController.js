var doctor = require('../Models/doctor');
var User = require('../Models/user');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.add = function(data,res){
  
    let user = (({
        name, user, pwd, role
    }) => ({name, user, pwd, role}))(data.user);

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
                data.user._id=user._id;
                doctor.create(data);
            }
        });
};
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