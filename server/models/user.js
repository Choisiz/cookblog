import moment from "moment";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requiredL: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  role: {
    type: String,
    enum: ["MainOwner", "SubJOwner", "User"],
    default: "User",
  },
  register_data: {
    type: Date,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  comments: [
    //1:n
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

const User = mongoose.model("user", userSchema);

export default User;
