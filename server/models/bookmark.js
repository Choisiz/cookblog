import mongoose from "mongoose";

const BookMarkSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  count: {
    type: Number,
    default: -2,
  },
  trueAndFalse: {
    type: Boolean,
    default: false,
  },
});

const BookMark = mongoose.model("bookmark", BookMarkSchema);

export default BookMark;
