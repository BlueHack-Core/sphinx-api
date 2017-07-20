'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('./../../../config.json');
var passportStrategy = require('./../passportStrategy');

passport.use(passportStrategy.githubStrategy);
router.get('/', passport.authenticate('github', { failureRedirect: '/'}));

router.post('/', function (req, res) {

    if (req.body != null) {
        var githubClientID = JSON.stringify(req.body.clientID);
        var githubClientSecret = JSON.stringify(req.body.clientSecret);
        var githubCallbackURL = JSON.stringify(req.body.callbackURL);

        config.github.clientID = githubClientID;
        config.github.clientSecret = githubClientSecret;
        config.github.callbackURL = githubCallbackURL;

        console.log('githubClientID =>' + config.github.clientID);
        console.log('githubClientSecret =>' + config.github.clientSecret);
        console.log('githubCallbackURL =>' + config.github.callbackURL);

        passport.use(passportStrategy.githubStrategy);
        res.redirect('/oauth/github');
    } else {
        res.send({400: "checked body info"});
    }

});

module.exports = router;