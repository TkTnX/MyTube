import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  likedVideos: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  playlists: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  watchLater: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

export default mongoose.model("User", userModel);
