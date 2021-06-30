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
    enum: ["MainJuin", "SubJuin", "User"],
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
        ref: "post",
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const User = mongoose.model("user", userSchema);

export default User;
