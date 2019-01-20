var express = require('express');
var router = express.Router();
var Message = require('../schema/message');


var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
};

function addDb (op, content){
    const newMessage = new Message({
        op: op,
        content: content,
    });
    newMessage.save()
};

/* GET home page. */
router.get('/', loggedin, function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.write('hello');
    console.log(req.session.username)
    Message.find()
      .then(message => res.json(message))
 // res.end();
});

router.get('/socket', function(req, res){
    console.log('im here');

});


router.post('/', function(req,res,next){
  //  req.app.io.emit('test', {key:'value'})
    var op = req.session.username;
    var content = req.body.content
    addDb(op, content)
     setTimeout(function(){
         Message.find()
             .then(message => req.app.io.emit('test', message))
     }, 10);
    //add promise at somepoint

});


module.exports = router;
