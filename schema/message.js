

    var db = require('mongoose');
    var schema = db.Schema;

    var messageSchema = new schema({
        mid:{
            type:String,
        },
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
        },
        tag:{
            type: String,
        }

});

module.exports = db.model('mtest', messageSchema, 'mtest');