var Message = require('../schema/message');
var User = require('../schema/user');


//User Sign Up
function addUser(username, password, email){
    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    newUser.save()
}

//User Login functions
function checkUserDB(username, password){
    return new Promise(function(resolve, reject) {
        console.log(username);
        //User sign up must be unique
        User.findOne({
            username: username
        })
            .then(doc => {
                if (doc.password === password) {
                    console.log('yeah');
                    resolve('auth');
                } else {
                    return '0';
                }
            })
            .catch(err => {
                console.log(err)
            });
    })
}



//Home page functions
//Add message
function addDb (op, content){
    const newMessage = new Message({
        op: op,
        content: content,
    });
    newMessage.save()
};

function message(m){
    addDb('drew', m)
}

module.exports = {
    message: message,
    check: checkUserDB,
    add: addUser
};