import mongoose, { Schema } from "mongoose";

const categortModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  videos: {
    type: [Schema.Types.ObjectId],
    ref: "Video",
    default: [],
  },
});

export default mongoose.model("Category", categortModel);
