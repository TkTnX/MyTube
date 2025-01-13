import Video from "../models/video.model.js";

export const getVideos = async (req, res) => {
  const videos = await Video.find().populate(
    "author",
    "username img subscribers"
  );
  res.status(200).json(videos);
};

export const getVideo = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id).populate(
    "author",
    "username img subscribers"
  );
  res.status(200).json(video);
};

export const createVideo = async (req, res) => {
  const newVideo = await Video.create(req.body);
  const video = await newVideo.save();
  res.status(200).json(video);
};

export const updateVideo = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findByIdAndUpdate(id, req.body);
  res.status(200).json(video);
};

export const getAuthorVideos = async (req, res) => {
  const authorId = req.params.authorId;
  const videos = await Video.find({ author: authorId });

  res.status(200).json(videos);
};

export const getRelatedVideos = async (req, res) => {
  const category = req.params.category;

  const videos = await Video.find({ category: category });
  res.status(200).json(videos);
};
