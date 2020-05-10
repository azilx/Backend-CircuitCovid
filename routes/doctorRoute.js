var express = require('express');
var router = express.Router();
var doctorController = require('../Controllers/doctorController');


router.get('/all', function(req, res, next) {
    doctorController.getAll().exec().then(data =>{
        res.json(data);
    })
});

router.post('/getByID', function(req, res, next) {
  doctorController.getById(req.body._id).exec().then(data =>{
      res.json(data);
  })
});
router.post('/getByParentID', function(req, res, next) {
  doctorController.getByParentId(req.body._id).exec().then(data =>{
      res.json(data);
  }).catch(err =>{
    console.log(err);
  })
});
router.post('/add', function(req, res, next) {
    doctorController.add(req.body)
    res.status(201).send({
        status: true,
        error: ''
    });
});
router.put('/update', function (req, res, next) {
  console.log(req.body);
  doctorController.update(req.body._id,req.body);
  res.status(200).send({
    status: true,
    error: ''
  });
});

router.delete('/delete', function (req, res, next) {
  console.log(req.body);
  doctorController.remove(req.body._id).exec().then(data=>{
    if(data)
      data.remove();
    res.json(data);
});
});
router.post('/test', doctorController.test);
module.exports = router;
