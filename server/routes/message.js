import express from "express";
import passport from "passport";
import { Message } from "../models/Message";
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'dw1fnyr3s',
    api_key: '262962525333366',
    api_secret: 'Sr8nd8pnJgiCjj66BkzaJq4vUMg'
});

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
    console.log(req)
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

messageRouter.post('/image',passport.authenticate("jwt", { session: false }),
 (req, res) => {
  

 }
)

export default messageRouter;
