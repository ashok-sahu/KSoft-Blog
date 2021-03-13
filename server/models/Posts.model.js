const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contectType: String,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    categories: [String],
    comments: [String],
    created: {
      type: Date,
      default: Date.now,
    },
    updated: Date,
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", PostSchema);
module.exports = Posts;
