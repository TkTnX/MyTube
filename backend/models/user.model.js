import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
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
    coverImg: {
      type: String,
    },
    description: {
      type: String,
    },
    likedVideos: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    dislikedVideos: {
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
    subscribers: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    subscriptions: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);
