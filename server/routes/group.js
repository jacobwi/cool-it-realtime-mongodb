import express from "express";
import passport from "passport";
const jwt = require("jsonwebtoken");
import { Group } from "../models/Group";

const io = require("../socket");
const groupRouter = express.Router();

// @route   POST user/profile
// @desc    Private route that only logged in users can access
// @access  Private
groupRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let group = req.body;
    let newGroup = new Group({
      name: req.body.name,
      details: req.body.details,
      createdBy: req.body.createdBy
    });

    newGroup
      .save()
      .then(resGroup => {
        io.getSession().emit("groups", { action: "create", group: newGroup });
        Group.findByIdAndUpdate(
          resGroup._id,
          { $push: { users: resGroup.createdBy } },
          { safe: true, upsert: true },
          function(err, model) {
            console.log(err);
          }
        );
        res.send(resGroup);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  }
);
// @route   POST user/profile
// @desc    Private route that only logged in users can access
// @access  Private
/* groupRouter.post(
  "/get_all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.body.id;
    let groupMap = [];
    Group.find({ users: req.body.id }, function (err, users) {
      users.forEach(function (user) {
        groupMap.push(user);
      });
      res.send(groupMap);
    });
  }
);
 */
groupRouter.post(
  "/get_all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.body.id;
    let groupMap = [];
    Group.find({}, function(err, groups) {
      groups.forEach(function(user) {
        groupMap.push(user);
      });
      res.send(groupMap);
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
