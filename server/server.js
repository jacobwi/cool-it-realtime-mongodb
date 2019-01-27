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
import chalk from "chalk";
require("dotenv").config();

const app = express();
// Passport config
passportConfig(app);
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
  .connect(process.env.MongoURI, {
    useNewUrlParser: true
  })
  .then(db => {
    console.log(
      chalk.green("Connection to MongoDB has been successfully established")
    );
    const server = app.listen(8080);

    const io = require("./socket").init(server);
    io.on("connection", socket => {
      console.log(`Client connected`);
    });
  })
  .catch(error => {
    console.log(chalk.red(`Database connection failed: ${error.errmsg}`));
  });

// Routes connection
app.use("/user", router);
app.use("/group", groupRouter);
// Initial GET method
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Expressjs has started successfully"
  });
});
