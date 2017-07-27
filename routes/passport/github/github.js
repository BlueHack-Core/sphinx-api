'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
// var config = require('./../../../config.json');
var passportStrategy = require('./../passportStrategy');

passport.use(passportStrategy.githubStrategy);
router.get('/', passport.authenticate('github', { failureRedirect: '/'}));
module.exports = router;