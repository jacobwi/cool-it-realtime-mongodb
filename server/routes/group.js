import express from "express";
import passport from "passport";
const jwt = require("jsonwebtoken");
import { Group } from "../models/Group";

const groupRouter = express.Router();

// @route   POST user/profile
// @desc    Private route that only logged in users can access
// @access  Private
groupRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let member = { username: req.body.username, role: "admin" };
    let newGroup = new Group({
      members: [member],
      name: req.body.name
    });

    newGroup
      .save()
      .then(user => {
        res.send(user);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  }
);

// @route   POST user/profile
// @desc    Private route that only logged in users can access
// @access  Private
groupRouter.post(
  "/get",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let username = req.body.username;
    Group.find({ members: { $elemMatch: { username: "abc" } } }).then(group => {
      res.status(200).json({
        groups: [...group]
      });
    });
  }
);

export default groupRouter;
