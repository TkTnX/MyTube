import Video from "../models/video.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

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
  const videos = await Video.find({ author: authorId }).limit(5);

  res.status(200).json(videos);
};

export const getRelatedVideos = async (req, res) => {
  const category = req.params.category;

  const videos = await Video.find({ category: category });
  res.status(200).json(videos);
};

export const uploadAuth = async (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    console.error("Imagekit Authentication Error", error);
    res.status(500).json({ error: "Imagekit Authentication Error" });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userClerkId = req.body.userClerkId;
    const user = await User.findOne({
      clerkId: userClerkId,
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const video = await Video.findById(videoId);

    // console.log(user.likedVideos);

    if (user.likedVideos.includes(videoId)) {
      await video.updateOne({
        likes: video.likes - 1,
      });
      await user.updateOne({
        $pull: { likedVideos: video.id },
      });
      return res.status(200).json({ likes: video.likes - 1 });
    } else {
      await video.updateOne({
        likes: video.likes + 1,
      });
      await user.updateOne({
        $push: { likedVideos: video.id },
      });
      return res.status(200).json({ likes: video.likes + 1 });
    }
  } catch (error) {
    console.error("Error liking video:", error);
    res.status(500).json({ error: "Error liking video" });
  }
};
