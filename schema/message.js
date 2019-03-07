//var ObjectId = require('mongodb').ObjectID;
var db = require('mongoose');

var schema = db.Schema;

var messageSchema = new schema({
   // _id:{
    //    type:ObjectId
   // },
    op:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    time:{
        type: String,
    }

});

module.exports = db.model('mtest', messageSchema, 'mtest');