

var Message = require('../schema/message');



var User = require('../schema/user');

function addUser(username, email, password){
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
                console.log(doc);
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
function addMessage (mid, op, content, time, tag){
    const newMessage = new Message({
        mid: mid,
        op: op,
        content: content,
        time:time,
        tag:tag
    });
    newMessage.save()

};



//find Profile Name


function findProfileMessages(profileName){
   var content = [];
    return new Promise(function(resolve, reject) {
        Message.find({
            op: profileName
        })
            .then(doc => {
                var messageData = JSON.parse(JSON.stringify(doc));
                var objectValue = Object.values(messageData);
                if (objectValue.length > 3) {
                    objectValue = objectValue.slice(Math.max(objectValue.length - 3, 1))
                }

                objectValue.forEach(function (element) {
                    content.push(element.content);
                });
                resolve(content)
            });
    })

}





module.exports = {
    message: addMessage,
    check: checkUserDB,
    add: addUser,
    findPM: findProfileMessages,

};