import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import passportConfig from "./config/passport.js";
import router from "./routes/user";
import groupRouter from "./routes/group";
import { MongoURI } from "./config";

const app = express();
// Socket
const client = require("socket.io").listen(6100).sockets;
// Port variable
const PORT = 6000;

// Morgan logger
app.use(morgan("tiny"));

// Connect body parser to express app
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());

// Database connection
mongoose
  .connect(
    MongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(db => {
    console.log("Connection to MongoDB has been successfully established");
  })
  .catch(error => {
    console.log(`Database connection failed: ${error.errmsg}`);
  });

// Passport config
passportConfig(app);

// Routes connection
app.use("/user", router);
app.use("/group", groupRouter);
// Initial GET method
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Expressjs has started successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Started listening to port ${PORT}`);
});