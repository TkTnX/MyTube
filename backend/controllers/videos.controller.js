import Video from "../models/video.model.js";

export const getVideos = async (req, res) => {
  const videos = await Video.find().populate("author", "username img");
  res.status(200).json(videos);
};

export const createVideo = async (req, res) => {
  const newVideo = await Video.create(req.body);
  const video = await newVideo.save();
  res.status(200).json(video);
};
