'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('./../../../config.json');

router.get('/',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        var accessToken = config.google.accessToken;
        console.log('config accessToken =>' + accessToken);
        console.log(res)

        var redirectUrl = process.env.GOOGLE_REDIRECTURL
        res.redirect(redirectUrl + '/?provider=google&accessToken=' + accessToken);
    });

module.exports = router;