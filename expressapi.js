const express = require('express')
const fs = require("fs")
const app = express()


app.use(express.json())

const port = 3000

app.use(express.static(__dirname + "/public"))

app.get('/api/users', (req, res) => {
    console.log(req.params);
    let content = fs.readFileSync("./data/users.json", "utf8")
    let users = JSON.parse(content)
    res.send(users)
})

app.get("/api/users/:id", (req, res)=>{
    let id = req.params.id;
    let content = fs.readFileSync("./data/users.json", "utf8")
    let users = JSON.parse(content);
    let user = null;
    for(let i = 0; i < users.length; i++){
        if(users[i].id == id){
            user = users[i];
            break;
        }
    }
    
    console.log(user);
    if(user){
        return res.send(user);
    }
    else{
        return res.status(404).send();
    }
})

app.post("/api/users", (req, res) => {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    let userName = req.body.name
    let userAge = req.body.userAge
    let user = {name: userName, age: userAge}

    let data = fs.readFileSync("./data/users.json", "utf8")
    let users = JSON.parse(data)
 console.log(users);
    let id = Math.max.apply(Math,users.map(function(o){return o.id;}))

    user.id = id+1
    users.push(user);
    data = JSON.stringify(users);
    fs.writeFileSync("./data/users.json", data)
    res.send(users);
})

app.delete("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let data = fs.readFileSync("./data/users.json", "utf8");
    let users = JSON.parse(data);
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
        fs.writeFileSync("./data/users.json", data)

        res.send(user)
    } else {
         res.status(404).send() 
    }
})

app.put("/api/users",  function(req, res){
      
    if(!req.body) return res.sendStatus(400);
     
    var userId = req.body.id;
    console.log("userId", userId)
    var userName = req.body.name;
    console.log("userName", userName)
    var userAge = req.body.age;
    console.log("userAge", userAge)
    var data = fs.readFileSync("./data/users.json", "utf8");
    var users = JSON.parse(data);
    console.log(users);
    
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            var user = users[i];
            console.log("user", user)
            
            break;
        }
    }
    if(user){
        user.age = userAge;
        user.name = userName;
        var data = JSON.stringify(users);
        fs.writeFileSync("./data/users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});
app.listen(port, () => console.log(`Example app listening on port port!`))