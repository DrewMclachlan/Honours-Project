var db = require('mongoose');

var schema = db.Schema;

var messageSchema = new schema({
    op:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
});

module.exports = db.model('mtest', messageSchema, 'mtest');