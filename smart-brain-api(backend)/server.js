const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
//biggest and most common error happens when we forget to use body parser

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test", //maybe test
    database: "smart_brain",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//when we such syntax use below like /:id it mean we can write anything
//at this place in yrl like /profile/33234

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGET(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
*** slight idea of what we wanna made and about routes

/  --> res = this  is working
/signin  --> POST = success / failure
/register  --> POST = user
/profile/:userId  --> GET = user
/image (rank) --> PUT = user

*/
