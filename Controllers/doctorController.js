var doctor = require('../Models/doctor');
var User = require('../Models/user');
var bcrypt = require('bcryptjs');
var config = require('../config');
var Hospital = require('../Models/hospital');

exports.add = function(data,res){
  
    let hospital = (({
        name,
        gouvernorat,
        delegation,
        type,
        adresse,
        codePostale
    }) => ({name, gouvernorat, delegation, type, adresse, codePostale }))(data.hospital);

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
            if(!data.hospital._id){
                user.pwd = bcrypt.hashSync(user.pwd, config.salt);
                user = new User(user);
                // save new user to db
                user.save();
                hospital = new Hospital(hospital);
                // save new user to db
                hospital.save();
                doc = new doctor(data);
                doc.user={_id : user._id};
                doc.hospital={_id : hospital._id};
                doc.save();
            }
            else {
                user.pwd = bcrypt.hashSync(user.pwd, config.salt);
                user = new User(user);
                // save new user to db
                user.save();
                doc = new doctor(data);
                doc.user={_id : user._id};
                doc.save();
            }
            }
        });
};

exports.getAll = function(){
    return doctor.find();
}
exports.getByHospitalService = function(hospital){
    return doctor.find({hospital: hospital});
}
exports.getById = function(id) {
    return doctor.findById(id);
}
exports.getByParentId = function(id) {
    return doctor.find({parent :{ _id:id } });
}
exports.remove = function(id){
    return doctor.findById(id);
}
exports.update = function(id,obj){
    doctor.findByIdAndUpdate({_id : id},obj,function(err,doc){
    });
}
exports.test=async function(req,res){
    var ids=await getDoctorSon(req.body._id);
    res.status(200).json({
        sons : ids
    });
    
}
async function getDoctorSon(idParentDoctor) {
    var doctorFamilly = [];
    await doctor.find({parent :{ _id:idParentDoctor } }).exec().then(async function(doctors){
        if(doctors.length>0)
        {
            doctors.forEach(async function(doc){
                doctorFamilly.push(doc._id.toString());
                var ids=await getDoctorSon(doc._id.toString());
                ids.forEach(id=>{
                    doctorFamilly.push(id);
                });
            });
        }
        else
        {
            doctorFamilly.push(idParentDoctor);
        }
    });
    
    return doctorFamilly;
    
}
