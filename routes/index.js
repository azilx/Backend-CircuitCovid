var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Merci pour vos efforts a tous , circuit covid backend is well deployed and running');
});

module.exports = router;
