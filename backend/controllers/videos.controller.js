import Video from "../models/video.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const getVideos = async (req, res) => {
  const category = req.query.category;
  const filter = category === "All" || !category ? {} : { category };
  const videos = await Video.find(filter).populate(
    "author",
    "username img subscribers"
  );
  res.status(200).json(videos);
};

export const getVideo = async (req, res) => {
  const id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid video ID format" });
  }

  const video = await Video.findById(id).populate(
    "author",
    "username img subscribers"
  );

  if (!video) return res.status(404).json({ error: "Video not found" });
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
  const filterQuery = req.query.filter;

  const filter = filterQuery
    ? { createdAt: filterQuery === "latest" ? 1 : -1 }
    : filterQuery === "popular"
    ? { views: -1 }
    : {};

  const videos = await Video.find({ author: authorId }).sort(filter).limit(5);

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

    if (user.likedVideos.includes(videoId)) {
      await video.updateOne({
        likes: video.likes - 1,
      });
      await user.updateOne({
        $pull: { likedVideos: video.id },
      });
      return res.status(200).json({ likes: video.likes - 1 });
    } else {
      let isDisliked = false;
      // проверка, что видео дизлайкнуто
      if (user.dislikedVideos.includes(videoId)) {
        isDisliked = true;
        await video.updateOne({
          dislikes: video.dislikes - 1,
        });
        await user.updateOne({
          $pull: { dislikedVideos: video.id },
        });
      }

      // лайкнули видео
      await video.updateOne({
        likes: video.likes + 1,
      });
      await user.updateOne({
        $push: {
          likedVideos: video.id,
        },
      });
      return res.status(200).json({
        likes: video.likes + 1,
        dislikes: isDisliked ? video.dislikes - 1 : video.dislikes,
      });
    }
  } catch (error) {
    console.error("Error liking video:", error);
    res.status(500).json({ error: "Error liking video" });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userClerkId = req.body.userClerkId;
    const user = await User.findOne({
      clerkId: userClerkId,
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const video = await Video.findById(videoId);
    if (user.dislikedVideos.includes(videoId)) {
      await video.updateOne({
        dislikes: video.dislikes - 1,
      });
      await user.updateOne({
        $pull: { dislikedVideos: video.id },
      });

      return res.status(200).json({ dislikes: video.dislikes - 1 });
    } else {
      let isLiked = false;
      // проверка, что видео лайкнуто
      if (user.likedVideos.includes(videoId)) {
        isLiked = true;
        await video.updateOne({
          likes: video.likes - 1,
        });
        await user.updateOne({
          $pull: { likedVideos: video.id },
        });
      }

      // дизлайкнули видео
      await video.updateOne({
        dislikes: video.dislikes + 1,
      });
      await user.updateOne({
        $push: { dislikedVideos: video.id },
      });
      return res.status(200).json({
        dislikes: video.dislikes + 1,
        likes: isLiked ? video.likes - 1 : video.likes,
      });
    }
  } catch (error) {
    console.error("Error liking video:", error);
    res.status(500).json({ error: "Error liking video" });
  }
};

export const getPopularVideos = async (req, res) => {
  try {
    const id = req.params.id;
    const popularVideos = await Video.find({ author: id })
      .sort({ views: -1 })
      .limit(5);

    if (!popularVideos)
      return res.status(404).json({ error: "Popular videos not found" });

    res.status(200).json(popularVideos);
  } catch (error) {
    console.error("Error getting video:", error);
    res.status(500).json({ error: "Error getting video" });
  }
};
