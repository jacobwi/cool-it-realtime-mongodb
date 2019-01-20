import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

// Schema creation for user
const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  last_seen: {
    type: Date,
    required: false
  },
  is_active: {
    type: Boolean,
    default: false
  },
  groups: [{ type: Schema.Types.ObjectId, ref: "groups" }]
});

// User's password prehook
UserSchema.pre("save", function(next) {
  let user = this;

  bcrypt.hash(user.password, 12, (error, hash) => {
    if (error) return next(error);
    user.password = hash;
    next();
  });
});

export const User = mongoose.model("users", UserSchema);
