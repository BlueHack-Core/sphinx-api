var express = require('express');
var router = express.Router();
var path    = require("path");


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  res.json({hello: "sphinx"})
  // res.sendFile(path.join(__dirname+'/../static/login.html'))
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
