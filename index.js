const express = require("express");
const fs = require("fs");

const app = express();

let users = [
    {id:1,name:'Mane',age:34},
    {id:2,name:'Anna',age:22},
    {id:3,name:'Gago',age:64}
];

fs.promises.readFile("./users.json", "utf-8")
  .then(data => {
    users = JSON.parse(data);
  })
  .catch(err => {
    console.log(err)
  });

app.get("/", (req, res) => {
  res.send("<h1>home page</h1>");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const maxAge = req.query.max_age;
  const minAge = req.query.min_age;

  let filteredUsers = users;

  if (name) {
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase() === name.toLowerCase()
    );
  }

  if (maxAge) {
    filteredUsers = filteredUsers.filter(user => 
      user.age <= +maxAge
    );
  }

  if (minAge) {
    filteredUsers = filteredUsers.filter(user => 
      user.age >= +minAge
    );
  }

  res.send(filteredUsers.length ? filteredUsers : users);
});

app.get("/users/:id", (req, res) => {
  let user = users.find(user => user.id === +req.params.id); 
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(3003, () => {
  console.log("Server is running!!!!");
});