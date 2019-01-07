var db = require('mongoose');

var schema = db.Schema;

var userSchema = new schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
});

module.exports = db.model('test', userSchema, 'test');