var express = require('express');
var router = express.Router();
var Message = require('../schema/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.write('hello');
    Message.find()
      .then(message => res.json(message))

  // console.log(req.session.username);
 // res.end();
});

router.post('/', function(req,res,next){
    console.log(req.body)
    const newMessage = new Message({
       // op: req.session.username,
        op: 'drew',
        content: req.body.content,
    });
    newMessage.save()
   // res.redirect('/')
});


module.exports = router;
