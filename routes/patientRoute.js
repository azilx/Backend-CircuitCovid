var express = require('express');
var router = express.Router();
var patientController = require('../Controllers/patientController');


router.get('/getPatient', function(req, res, next) {
  patientController.getPatient(req.body).exec().then(data =>{
      res.json(data);
  })
});
router.get('/all', function(req, res, next) {
    patientController.getAll().exec().then(data =>{
        res.json(data);
    })
});
router.post('/getByDoctor', function(req, res, next) {
  patientController.getByDoctor(req.body.doctor._id).exec().then(data =>{
      res.json(data);
  })
});
router.post('/getByHospitalService', function(req, res, next) {
  patientController.getByHospitalService(req.body.hospital).exec().then(data =>{
      res.json(data);
  })
});
router.post('/getByID', function(req, res, next) {
  patientController.getById(req.body._id).exec().then(data =>{
      res.json(data);
  })
});
router.post('/add', function(req, res, next) {
    console.log(req.body);
    patientController.add(req.body);
    res.status(201).send({
      status: true,
      error: '',
  });
});
router.put('/update', function (req, res, next) {
  console.log(req.body);
  patientController.update(req.body._id,req.body);
  res.status(200).send({
    status: true,
    error: '',
});
})
router.delete('/delete', function (req, res, next) {
  console.log(req.body);
  patientController.remove(req.body._id).exec().then(data=>{
    if(data)
      data.remove();
    res.json(data);
  })
})
router.post('/setPendingOff', function (req, res, next) {
  patientController.setPendingSurveyOff(req,res);
});
module.exports = router;
