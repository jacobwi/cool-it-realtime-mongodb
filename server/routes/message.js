import express from "express";
import passport from "passport";
import { Message } from "../models/Message";

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const io = require("../socket");
const messageRouter = express.Router();

// @route   POST message/get_all_messages
// @desc    Private route that only logged in users can access
// @access  Private
messageRouter.post(
  "/get_all_messages",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let groupMap = [];
    Message.find({ group: req.body.id }, function(err, users) {
      users.forEach(function(user) {
        groupMap.push(user);
      });
      res.send(groupMap);
    });
  }
);

// @route   POST message/post_message
// @desc    Private route that only logged in users can access
// @access  Private
messageRouter.post(
  "/post_message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let newMessage = new Message({
      group: req.body.group,
      body: req.body.body,
      author: req.body.author
    });

    newMessage
      .save()
      .then(resGroup => {
        io.getSession().emit("messages", {
          action: "create",
          message: newMessage
        });
        res.send(resGroup);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  }
);

messageRouter.post('/image', upload.single('avatar'), function (req, res, next) {

  console.log(req.body.img)
  let newMessage = new Message({
    group: req.body.group,
    img: req.body.img,
    author: req.body.author
  });

  newMessage
    .save()
    .then(resGroup => {
      io.getSession().emit("messages", {
        action: "create",
        message: newMessage
      });
      res.send(resGroup);
    })
    .catch(error => {
      res.status(400).send(error);
    });

})

export default messageRouter;
