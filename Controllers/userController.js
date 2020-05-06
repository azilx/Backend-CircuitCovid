var User = require('../Models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var doctor = require('../Models/doctor');
var patient = require('../Models/patient');
var config = require('../config');

var jwt_sign = function(payload, secret) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
            expiresIn: 5 * 60
        }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
}
exports.getall = function(req,res){
    User.find().exec().then(data => {
        res.send(data);
    });
}
// Register new user on POST
exports.register_post = function(req, res) {
    // extract req.body fields to create user
    let user = (({
        name, user, pwd, role
    }) => ({name, user, pwd, role}))(req.body);

    // check if exist
    User.findOne({user: user.user}).then((doc) => {
        if (doc) {
            return Promise.reject({
                status: false,
                error: 'User has been already exist.'
            })

        } else {
            // hash password
            user.pwd = bcrypt.hashSync(user.pwd, config.salt);

            user = new User(user);

            // save new user to db
            return user.save();
        }
    }).then((doc) => {
        console.log(doc);
        res.status(201).send({
            status: true,
            error: '',
            user: user
        });
    }).catch((e) => {
        res.status(500).send(e);
    });
};

// Login user on POST
exports.login_post = function(req, res) {
    // get login info from req.body
    let loginInfo = (({
        user, pwd
    }) => ({user, pwd}))(req.body);

    let userInfo = {};
    let token = '';

    // hash pwd to searah in db
    loginInfo.pwd = bcrypt.hashSync(loginInfo.pwd, config.salt);

    // find user in db
    User.findOne(loginInfo).then((doc) => {
        // if found, create jwt token
        if (doc) {
            userInfo = (({
                _id,name, user, role
            }) => ({_id,name, user, role}))(doc);

            // sign token
            return jwt_sign(userInfo, config.secret);
        // user not found
        } else {
            return Promise.reject({
                status: false,
                error: 'User not found.'
            })
        }
    }).then((token) => {
        // set client clientSessions
        if(userInfo.role=='doctor')
        {
            doctor.find({user : {
                "_id" : userInfo._id
            }}).exec().then(
                data=>{
                    data.user=userInfo;
                    res.status(200).send({
                        doc : data,
                        user : userInfo,
                        token: token
                    });
                }
            );
        
        }
        else if(userInfo.role=='patient')
        {
            patient.find({user : {
                "_id" : userInfo._id
            }}).exec().then(
                data=>{
                    data.user=userInfo;
                    res.status(200).send({
                        patient : data,
                        user : userInfo,
                        token: token
                    });
                }
            );
        
        }
        else
        {
            res.status(200).send({
                user : userInfo,
                token: token,
                error : ""
            });
        }
        
    }).catch((e) => {
        console.log("here");
        console.log(e);
        
        res.status(400).send(e);
    })
}

exports.changePassword = function(req, res) {

   changeInfo = (({
                _id, old_password, new_password, confirm_password
            }) => ({_id, old_password, new_password, confirm_password}))(req.body);
        
            // find if old password is valid
            User.findOne({ _id: changeInfo._id })
              .then(oldUser => {
                if (!oldUser) return res.status(404).send("User does not exist");
        
        
                bcrypt.compare(changeInfo.old_password,oldUser.pwd, (err, isMatch) => {
                  if (err) {
                    return res.status(401).send("Unauthorized")
                  }
                  if (isMatch && changeInfo.new_password == changeInfo.confirm_password) {
                    // change to new password
                    oldUser.pwd = bcrypt.hashSync(changeInfo.new_password, config.salt);
                    oldUser
                      .save()
                      .then(newUser => {
                        res.status(200).send(newUser)
                      })
                      .catch(err => {
                        const message = err.message
                        res.status(500).json({
                          status: "change password failed",
                          msg: message
                        })
                      })
                  } else {
                    return res.status(401).send("Invalid old password")
                  }
                })
              })
              .catch(err => {
                res.status(500).send(err)
    })
}
    