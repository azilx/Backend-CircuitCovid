var express = require('express');
var router = express.Router();
var patientController = require('../Controllers/patientController');
const verifyToken = require("../middleware/jwt");

router.get('/all', verifyToken, function(req, res, next) {
    patientController.getAll().exec().then(data =>{
        res.json(data);
    })
});
router.post('/getByDoctor', verifyToken, function(req, res, next) {
  patientController.getByDoctor(req.body.doctor._id).exec().then(data =>{
      res.json(data);
  })
});
router.post('/getByID', verifyToken, function(req, res, next) {
  patientController.getById(req.body._id).exec().then(data =>{
      res.json(data);
  })
});
router.post('/add', verifyToken, function(req, res, next) {
    console.log(req.body);
    patientController.add(req.body);
    res.status(201).send({
      status: true,
      error: '',
  });
});
router.post('/addMany', verifyToken, function(req, res, next) {
  console.log(req.body);
  patientController.addMany(req.body.patients);
  res.status(201).send({
    status: true,
    error: '',
});
});
router.put('/update', verifyToken, function (req, res, next) {
  console.log(req.body);
  patientController.update(req.body._id,req.body);
  res.status(200).send({
    status: true,
    error: '',
});
})
router.delete('/delete', verifyToken, function (req, res, next) {
  console.log(req.body);
  patientController.remove(req.body._id).exec().then(data=>{
    if(data)
      data.remove();
    res.json(data);
  })
})
router.post('/setPendingOff', verifyToken, function (req, res, next) {
  patientController.setPendingSurveyOff(req,res);
});
module.exports = router;
