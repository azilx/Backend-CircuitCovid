var express = require('express');
var router = express.Router();

var userController = require('../Controllers/userController');

// POST request to register new user
router.post('/register', userController.register_post);

// POST request to user login
router.post('/login', userController.login_post);

router.get('/user/getall', userController.getall);

router.post('/changePassword', userController.changePassword);

router.put('/update', function (req, res, next) {
    userController.update(req.body._id,req.body);
    res.status(200).send({
      status: true,
      error: '',
  });
  })
  router.delete('/delete', function (req, res, next) {
    console.log(req.body);
    userController.remove(req.body._id).exec().then(data=>{
      if(data)
        data.remove();
      res.json(data);
    })
  })
module.exports = router;
