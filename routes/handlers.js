

var Message = require('../schema/message');
var User = require('../schema/user');


//User Sign Up
function addUser(username, email, password){
    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    newUser.save()
}

//User Login functions§
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
function addDb (op, content){
    const newMessage = new Message({
        op: op,
        content: content,
    });
    newMessage.save()

};

function message(user, content){
    addDb(user, content)
}


//find Profile Name
function findProfileMessages(profileName){
   var content = [];
    return new Promise(function(resolve, reject) {
        Message.find({
            op: profileName
        })
            .then(doc => {
                var x = JSON.parse(JSON.stringify(doc));
                var y = Object.values(x)
                if (y.length > 3) {
                    y = y.slice(Math.max(y.length - 3, 1))
                }

                y.forEach(function (element) {
                  //  console.log(element.content);
                    content.push(element.content);
                   // console.log(content)
                });
                resolve(content)
            });
    })

}

//Search for userProfile
function search(searchq){
var searchname;
return new Promise(function(resolve, reject){
    User.find({
        username: searchq
    })
    //make this cleaner
        .then(doc =>{
           var x = JSON.parse(JSON.stringify(doc))
            x.forEach(function (element) {
                searchname = element.username;
                resolve(searchname)
            });
        })
            .catch(err =>{
                reject(err);
            })
})
}



module.exports = {
    message: message,
    check: checkUserDB,
    add: addUser,
    findPM: findProfileMessages,
    search: search
};