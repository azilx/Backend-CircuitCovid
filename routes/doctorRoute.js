var express = require('express');
var router = express.Router();
var doctorController = require('../Controllers/doctorController');


router.get('/all', function(req, res, next) {
    doctorController.getAll().exec().then(data =>{
        res.json(data);
    })
});
router.post('/add', function(req, res, next) {
    doctorController.add(req.body)
    res.status(201).send({
        status: true,
        error: '',
        doctor: req.body
    });
});
router.post('/update', function (req, res, next) {
  console.log(req.body);
  doctorController.update(req.body._id,req.body);
  res.status(200);
})
router.post('/delete', function (req, res, next) {
  console.log(req.body);
  doctorController.remove(req.body._id).exec().then(data=>{
    if(data)
      data.remove();
    res.json(data);
  })
    
  
})
module.exports = router;
