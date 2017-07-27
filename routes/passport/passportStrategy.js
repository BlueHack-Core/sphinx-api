'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var config = require('./../../config.json');


exports.githubStrategy = new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
        callbackURL: process.env.GITHUB_CALLBACKURL
    },
    function (accessToken, refreshToken, profile, done) {

        var user;
        if (profile) {
            user = profile;
            console.log('accessToken =>' + accessToken);
            console.log(accessToken)
            console.log(refreshToken)
            console.log(profile)
            config.github.accessToken = accessToken;
            //var localStorage = require('localStorage'), token = {token: accessToken};
            //localStorage.setItem('accessToken', token);
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
);