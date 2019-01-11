var express = require('express');
var router = express.Router();
var User = require('../schema/user');

module.exports = function (passport) {

router.get('/', function (req, res) {
    res.send('login');
})

router.get('/home', function (req, res) {
    res.send('home');
})

    router.post('/', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/login/home',
    }), function (req, res) {
        console.log(1)
        res.send('err')
    })

    router.post('/drew', function (req, res) {
        res.send("<h1>he</h1>")
    })

    return router
};