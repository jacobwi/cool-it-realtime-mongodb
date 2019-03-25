import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { resolve } from "path";
import morgan from "morgan";
import cors from "cors";
import passportConfig from "./config/passport.js";
import router from "./routes/user";
import groupRouter from "./routes/group";
import messageRouter from "./routes/message";
import chalk from "chalk";
import { cloudinaryConfig } from "./config/cloudinary";
require("dotenv").config();

const app = express();

// Passport config
passportConfig(app);

// Port variable
const PORT = 6000;

// Morgan logger
app.use(morgan("tiny"));

// Connect body parser to express app
app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
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
app.use("*", cloudinaryConfig);
app.use("/user", router);
app.use("/group", groupRouter);
app.use("/message", messageRouter);

// Initial GET method
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Expressjs has started successfully"
  });
});
