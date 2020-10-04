import express from "express";
// import socketIO from "socket.io";
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const mongoose = require("mongoose");

const UserList = require("./models/user");
const MONGO_CONFIG = require("./config/mongodb");

const connectOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Set up default mongoose connection
mongoose.connect(MONGO_CONFIG.ENDPOINT, connectOption);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default (app, http) => {
  app.use(express.json());
  app.use(cors());

  app.post("/api/v1/auth", (req, res) => {
    console.log(req.body);
    const userId = new mongoose.Types.ObjectId();
    const email = req.body.user.email;
    // const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const status = "preInterview";
    bcrypt.hash(req.body.user.password, saltRounds, (err, hashedPassword) => {
      console.log(hashedPassword);
      const filter = {
        email,
      };
      const update = {
        userId,
        email,
        password: hashedPassword,
        status,
        name: "",
        iconUrl: "",
        tag: "",
        description: "",
      };
      UserList.updateOne(
        filter,
        update,
        {
          upsert: true,
        },
        (err, result) => {
          if (!err) {
            return res.json({
              status: "success",
            });
          }
          console.error(err);
        }
      );
    });

    // res.send('Got a POST request');
  });

  app.delete("/api/v1/auth", (req, res) => {
    console.log(req);
    console.log(req.body);
    res.send("Got a DELETE request at /user");
  });
  //
  // app.get('/foo', (req, res) => {
  //   res.json({msg: 'foo'});
  // });
  //
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  //
  // optional support for socket.io
  //
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
};
