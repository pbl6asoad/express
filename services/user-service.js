const fs = require('fs')

let data = fs.readFileSync("users.json", "utf8");
let users = JSON.parse(data);

const createUser = (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let userName = req.body.name
    let userAge = req.body.userAge
    let user = {name: userName, age: userAge}


 console.log(users);
    let id = Math.max.apply(Math,users.map(function(o){return o.id;}))

    user.id = id+1
    users.push(user);
    data = JSON.stringify(users);
    fs.writeFileSync("users.json", data)
    return user;
}

const readUser = (req, res) => {
    return users;
}


const removeUser = (id, res) => {
    
    console.log(id);
    let index = -1;
    for(let i = 0; i < users.length; i++){
        if(users[i].id == id){
         index = i;
         break;        
        }
    }
    if(index > -1){
        let user = users.splice(index, 1)[0];
        let data = JSON.stringify(users);
        fs.writeFileSync("users.json", data)

        return user
    } else {
        res.status(404).send() 
    }
}

const uptodateUser = (req, res) => {
      
    if(!req.body) return res.sendStatus(400);
     
    let userId = req.body.id;
    let userName = req.body.name;
    let userAge = req.body.age;
    let user
    for(let i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            
            break;
        }
    }
    if(user){
        user.age = userAge;
        user.name = userName;
        let data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        return user;
    }
    else{
        res.status(404).send(user);
    }
};
module.exports = {
    createUser, 
    readUser, 
    uptodateUser,
    removeUser
}