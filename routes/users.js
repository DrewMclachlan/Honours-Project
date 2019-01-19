var express = require('express');
var router = express.Router();
var User = require('../schema/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    User.find()
        .then(users => res.json(users))
});

router.post('/', function(req, res, next){
    console.log('in post')
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
});
module.exports = router;
