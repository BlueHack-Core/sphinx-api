'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
// var config = require('./../../../config.json');
var passportStrategy = require('./../passportStrategy');

passport.use(passportStrategy.googleStrategy);
router.get('/',
    passport.authenticate('google', {scope: ['openid', 'email']}),
    function (req, res) {
        console.log(res.body);
    });
module.exports = router;