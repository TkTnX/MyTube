import mongoose, { Schema } from "mongoose";

const playlistModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videos: {
      type: [Schema.Types.ObjectId],
      ref: "Video",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", playlistModel);
