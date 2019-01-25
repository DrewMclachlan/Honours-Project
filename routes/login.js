var express = require('express');
var router = express.Router();
var User = require('../schema/user');

module.exports = function (passport) {

router.get('/', function (req, res) {
    res.send('login');
    console.log('hellp');
})

router.get('/home', function (req, res) {
    res.send('home');
    console.log(req.body)
})

    router.post('/', function(req, res, next){
        console.log(req.body)
        req.session.username = req.body.username
        next()
    }, passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/login/home',
    }), function (req, res) {
    })

    router.post('/drew', function (req, res) {
        res.send("<h1>he</h1>")
    })

    return router
};