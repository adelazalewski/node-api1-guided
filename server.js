//this is pulling from node_modules reather then Node stdlib
const express = require("express");
const db = require("./database")
const server = express();

server.get("/", (req, res) => {
   res.json({message: "Hello, World!"}); 
})

//middleware
server.use(express.json());

server.get("/users", (req, res) => {
const users = db.getUsers();
res.json(users);
})
server.get("/users/:id", (req, res) => {
//the param var matches up to the name of the url param above
    const id = req.params.id;
    const user = db.getUserById(id);
//send info 
    if(user) {
        res.json(user);
    }else{
        res.status(404).json({
            message: "User not found"
        })
    }
})
server.post("/users", (req, res) => {
    if(!req.body.name) {
        //end the request
        return res.status(400).json({
            message: "Need a user name",
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
    })

    res.json(newUser);
})
server.put("/users/:id", (req, res) => {
    //make sure the user exists before trying to update
    const user = db.getUserById(req.params.id);
    if(user) {
        //user exists continue updating it
        const updateUser = db.updateUser(user.id, {
            //specify the object and so the values that are being updated, rather then passing req.body directly
            name: req.body.name || user.name
        });
        res.json(updateUser);
        //or req.params.is
    }else{
        res.status(404).json({
            message:  "user not found",
        })
    }
})
server.delete("/users/:id", (req, res) => {
   //make sure the user exists before trying to update
   const user = db.getUserById(req.params.id);
   if(user) {
       db.deleteUser(user.id)
    //204 success but no response
    //or res.status(204).end();
    res.json({
        message: "User deleted"
    });
    //or req.params.is
}else{
    res.status(404).json({
        message:  "user not found",
    })
}
})
server.listen(8080, () => {
    console.log("server started at http://localhost:8080")
});