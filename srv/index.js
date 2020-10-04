import express from "express";
// import socketIO from "socket.io";
const cors = require("cors");

export default (app, http) => {
  app.use(express.json());
  app.use(cors());

  app.post("/api/v1/auth", (req, res) => {
    console.log(req.body);
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
