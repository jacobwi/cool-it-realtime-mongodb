import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    group: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      username: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);
export const Message = mongoose.model("messages", MessageSchema);
