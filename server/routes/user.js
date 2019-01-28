import express from "express";
import passport from "passport";
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import md5 from "md5";

const router = express.Router();

// @route   GET user/test
// @desc    Test request
// @access  Public
router.get("/test", (req, res) => {
  res.send("Test completed");
});

// @route   POST user/register
// @desc    Registers a user
// @access  Public
router.post("/register", (req, res) => {
  console.log("reach");
  let avatar = `https://www.gravatar.com/avatar/${md5(
    req.body.email
  )}?d=identicon`;
  let newUser = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    avatar: avatar
  });

  newUser
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

// @route   POST user/login
// @desc    Login request
// @access  Public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find user by email
  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      // NOT FOUND
      return res.status(404).json({ username: "User not found" });
    }

    // Resalt the input password and cross refernce it to db
    bcrypt.compare(password, user.password).then(isValid => {
      if (isValid) {
        // Generate JSON token
        jwt.sign(
          user.toJSON(),
          process.env.jwtKey,
          { expiresIn: "7d" },
          (err, token) => {
            if (err) throw err;

            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        res.status(400).json({ password: "Password is incorrect" });
      }
    });
  });
});

export default router;
