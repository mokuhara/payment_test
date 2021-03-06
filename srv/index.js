import express from "express";
const request = require("request");
// import socketIO from "socket.io";

const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const N = 16;

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const UserList = require("./models/user");
const Rooms = require("./models/zoom")
const ZOOM_CONFIG = require("./config/zoom")
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

const multer = require("multer");
const upload = multer({
  dest: "../uploads/",
});
const fs = require("fs");
const AWS = require("aws-sdk");
AWS.config.loadFromPath("./srv/config/awsCredentials.json");

export default (app, http) => {
  app.use(express.json());
  app.use(cors());

  app.post("/api/v1/fileUpload", upload.single("file"), async (req, res) => {
    const s3 = new AWS.S3();
    const fileName = crypto
      .randomBytes(N)
      .toString("base64")
      .substring(0, N);
    let params = {
      Bucket: "payment-test-1234",
      Key: fileName,
    };
    const file = fs.readFileSync(req.file.path, (err, data) => {
      return data;
    });
    params.Body = file;
    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err, err.message);
      } else {
        console.log("success file upload");
        delete params.Body;
        params.Expires = 60 * 60 * 24 * 7; //7days
        s3.getSignedUrl("getObject", params, function (err, url) {
          res.send({
            name: fileName,
            url: url,
          });
        });
      }
    });
  });

  app.post("/api/v1/user", async (req, res) => {
    const bearToken = req.headers["authorization"];
    // console.log(bearToken);
    if (bearToken) {
      const bearer = bearToken.split(" ");
      const token = bearer[1];
      jwt.verify(token, "secret", (err, user) => {
        if (!err) {
          UserList.findOne({
              userId: user.id,
            },
            (err, result) => {
              if (err) throw err;
              if (result) {
                return res.json({
                  ...result["_doc"],
                  token: token,
                });
              }
            }
          );
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
          UserList.findOne({
              userId: user.id,
            },
            (err, result) => {
              if (err) throw err;
              if (result) {
                return res.json({
                  ...result["_doc"],
                  token: token,
                });
              }
            }
          );
        }
      });
    }

    //tokenがない場合emaiから既存ユーザーか確認。pass一致してればuser情報返す
    const email = req.body.user.email;
    const doc = await UserList.findOne({
      email: email,
    });
    console.log(doc);
    if (doc && bcrypt.compareSync(req.body.user.password, doc.password)) {
      const payload = {
        id: doc.userId,
        email: email,
      };
      const token = jwt.sign(payload, "secret");
      return res.json({
        ...doc["_doc"],
        token: token,
      });
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
        iconName: "",
        tag: "",
        description: "",
      };
      UserList.updateOne(
        filter,
        update, {
          upsert: true,
        },
        (err, result) => {
          if (!err) {
            const payload = {
              id: userId,
              email: email,
            };
            const token = jwt.sign(payload, "secret");
            return res.json({
              ...update,
              token: token,
            });
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

  app.patch("/api/v1/user", (req, res) => {
    const filter = req.body.filter;
    const update = req.body.update;
    UserList.updateOne(
      filter,
      update, {
        upsert: true,
      },
      (err, result) => {
        console.log(err);
        console.log(result);
        if (!err) {
          return res.json({
            status: "success",
            result: result,
          });
        }
        console.error(err);
      }
    );
  });

  app.get("/api/v1/user", (req, res) => {
    UserList.find()
      .lean()
      .exec((err, result) => {
        if (!err) {
          return res.json({
            result,
          });
        }
      });
  });

  app.post("/api/v1/createroom", (req, res) => {
    const userId = req.body.userId;
    const options = {
      method: "POST",
      url: ZOOM_CONFIG.ENDPOINT,
      headers: {
        authorization: `Bearer ${ZOOM_CONFIG.TOKEN}`
      },
      json: {
        topic: "Weekly Meeting",
        type: "2",
        start_time: "2020-10-27T18:30:00",
        timezone: "Asia/Tokyo",
        settings: {
          use_pmi: "false",
        },
      },
    };
    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      const data = {
        userId: userId,
        roomUrl: body.join_url
      }
      Rooms.create(data, (err, res) => {
        if (err) return handleError(err);
      });
      return res.json({
        result: body,
      });
    });
  });

  const export_func = require("./stripe-exports");

  app.post('/api/vi/stripe/application', async (req, res) => {
    const result = await export_func.stripe_create_customer(req.body.email);
    res.json({
      result: "application plan!"
    });
    console.log('Created a customer.');
  })
};