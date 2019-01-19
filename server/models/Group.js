import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Schema creation for user
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [
    {
      type: Object
    }
  ],
  messages: [],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

export const Group = mongoose.model("groups", GroupSchema);
