import express from "express";
// import socketIO from "socket.io";
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

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

  app.post("/api/v1/user", async (req, res) => {
    const bearToken = req.headers["authorization"];
    console.log(bearToken);
    if (bearToken) {
      const bearer = bearToken.split(" ");
      const token = bearer[1];
      jwt.verify(token, "secret", (err, user) => {
        if (!err) {
          UserList.findOne({ userId: user.id }, (err, result) => {
            if (err) throw err;
            if (result) {
              return res.json({ ...result["_doc"], token: token });
            }
          });
        }
      });
    }
  });

  app.post("/api/v1/auth", async (req, res) => {
    //tokenがある場合内容を確認してuser情報を返却
    const bearToken = req.headers["authorization"];
    console.log(bearToken);
    if (bearToken) {
      const bearer = bearToken.split(" ");
      const token = bearer[1];
      jwt.verify(token, "secret", (err, user) => {
        if (!err) {
          UserList.findOne({ userId: user.id }, (err, result) => {
            if (err) throw err;
            if (result) {
              return res.json({ ...result["_doc"], token: token });
            }
          });
        }
      });
    }

    //tokenがない場合emaiから既存ユーザーか確認。pass一致してればuser情報返す
    const email = req.body.user.email;
    const doc = await UserList.findOne({ email: email });
    console.log(doc);
    if (doc && bcrypt.compareSync(req.body.user.password, doc.password)) {
      const payload = {
        id: doc.userId,
        email: email,
      };
      const token = jwt.sign(payload, "secret");
      return res.json({ ...doc["_doc"], token: token });
    }

    //tokenがないかつ新規ユーザーの場合
    const userId = new mongoose.Types.ObjectId();
    const status = "preInterview";
    bcrypt.hash(req.body.user.password, saltRounds, (err, hashedPassword) => {
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
            const payload = {
              id: userId,
              email: email,
            };
            const token = jwt.sign(payload, "secret");
            return res.json({ ...update, token: token });
          }
          console.error(err);
        }
      );
    });
  });

  app.delete("/api/v1/auth", (req, res) => {
    console.log(req.body);
    res.send("Got a DELETE request at /user");
  });
};
