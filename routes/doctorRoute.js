var express = require('express');
var router = express.Router();
var doctorController = require('../Controllers/doctorController');
const verifyToken = require("../middleware/jwt");

router.get('/all', verifyToken, function(req, res, next) {
    doctorController.getAll().exec().then(data =>{
        res.json(data);
    })
});

router.post('/getByID', verifyToken, function(req, res, next) {
  doctorController.getById(req.body._id).exec().then(data =>{
      res.json(data);
  })
});
router.post('/getByParentID', verifyToken, function(req, res, next) {
  doctorController.getByParentId(req.body._id).exec().then(data =>{
      res.json(data);
  }).catch(err =>{
    console.log(err);
  })
});
router.post('/add', verifyToken, function(req, res, next) {
    doctorController.add(req.body)
    res.status(201).send({
        status: true,
        error: ''
    });
});
router.put('/update', verifyToken, function (req, res, next) {
  console.log(req.body);
  doctorController.update(req.body._id,req.body);
  res.status(200).send({
    status: true,
    error: ''
  });
});

router.delete('/delete', verifyToken, function (req, res, next) {
  console.log(req.body);
  doctorController.remove(req.body._id).exec().then(data=>{
    if(data)
      data.remove();
    res.json(data);
});
});
router.post('/test', doctorController.test);
module.exports = router;
