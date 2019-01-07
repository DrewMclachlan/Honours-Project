var express = require('express');
var router = express.Router();
var Message = require('../schema/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.write('hello');
  res.write(req.session.username);
  res.end();
});

router.post('/', function(req,res,next){
    const newMessage = new Message({
        op: req.session.username,
        content: req.body.content,
    });
    newMessage.save()
});


module.exports = router;
