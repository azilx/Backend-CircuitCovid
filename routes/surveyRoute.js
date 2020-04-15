var express = require('express');
var router = express.Router();
var surveyController = require('../Controllers/surveyController');


router.get('/all', function(req, res, next) {
    surveyController.getAll().exec().then(data =>{
        res.json(data);
    })
});

router.post('/add', function(req, res, next) {
    surveyController.add(req.body)
    res.status(201).send({
        status: true,
        error: '',
        doctor: req.body
    });
});

router.post('/update', function (req, res, next) {
  console.log(req.body);
  surveyController.update(req.body._id,req.body);
  res.status(200);
});

router.post('/delete', function (req, res, next) {
  console.log(req.body);
  surveyController.remove(req.body._id).exec().then(data=>{
    if(data)
      data.remove();
    res.json(data);
  })
})

module.exports = router;
