

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
function addDb (op, content, time, tag){
    const newMessage = new Message({
       // _id: id,
        op: op,
        content: content,
        time:time,
        tag:tag
    });
    newMessage.save()
};

function message(user, content, time, tag){
    addDb(user, content, time, tag)
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

function searchtag(searchqt){
    return new Promise(function(resolve, reject){
        Message.find({
            tag: searchqt
        })
        //make this cleaner
            .then(doc =>{
                var x = JSON.parse(JSON.stringify(doc))
                    resolve(x)
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
    search: search,
    searchtag: searchtag
};