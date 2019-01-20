import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Schema creation for user
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  users: [String]
});

export const Group = mongoose.model("groups", GroupSchema);
