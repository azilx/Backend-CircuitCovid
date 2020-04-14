var express = require('express');
var router = express.Router();
var patientController = require('../Controllers/patientController');


router.get('/all', function(req, res, next) {
    patientController.getAll().exec().then(data =>{
        res.json(data);
    })
});
router.post('/add', function(req, res, next) {
    console.log(req.body);
    patientController.add(req.body);
    res.send(req.body);
});
router.post('/update', function (req, res, next) {
  console.log(req.body);
  patientController.update(req.body._id,req.body);
  res.status(200);
})
router.post('/delete', function (req, res, next) {
  console.log(req.body);
  patientController.remove(req.body._id).exec().then(data=>{
    if(data)
      data.remove();
    res.json(data);
  })
    
  
})
module.exports = router;
