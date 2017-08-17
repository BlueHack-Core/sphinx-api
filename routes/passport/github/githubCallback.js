'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('./../../../config.json');

router.get('/',
    passport.authenticate('github', {failureRedirect: '/'}),
    function (req, res) {
        // Successful authentication, redirect home.
        var accessToken = config.github.accessToken;
        console.log('config accessToken =>' + accessToken);
        console.log(res)

        var redirectUrl = process.env.GITHUB_REDIRECTURL
        //var redirectUrl = config.github.callbackURL
        res.redirect(redirectUrl + '/?provider=github&accessToken=' + accessToken);
    });

module.exports = router;