import express from "express";
import passport from "passport";
import { Message } from "../models/Message";
import { multerUploads, dataUri } from "../config/multer";
const io = require("../socket");
const messageRouter = express.Router();
import { uploader, cloudinaryConfig } from "../config/cloudinary";
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
    console.log(req.body);
    let newMessage = new Message({
      group: req.body.group,
      body: req.body.body,
      author: req.body.author,
      img: req.body.img
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

messageRouter.post("/image", multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then(result => {
        const image = result.url;

        return res.status(200).json({
          messge: "Your image has been uploded successfully to cloudinary",
          data: {
            image
          }
        });
      })
      .catch(err =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err
          }
        })
      );
  }
});

export default messageRouter;
