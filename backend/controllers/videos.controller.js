import Video from "../models/video.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import Category from "../models/category.model.js";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const getVideos = async (req, res) => {
  try {
    const category = req.query.category;
    const sortQuery = req.query.sortQuery;
    const limit = req.query.limit;
    const searchQuery = req.query.searchQuery;
    const takeDate = req.query.takeDate;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let filter = {};

    if (category && category !== "All") {
      if (category === "trending") {
        filter.createdAt = { $gte: sevenDaysAgo };
      } else {
        filter.category = category.toLowerCase();
      }
    }

    switch (takeDate?.toLowerCase()) {
      case "day":
        filter.createdAt = {
          $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        };
        break;
      case "week":
        filter.createdAt = { $gte: sevenDaysAgo };
        break;
      case "month":
        filter.createdAt = {
          $gte: new Date().setMonth(new Date().getMonth() - 1),
        };
        break;

      default:
        break;
    }

    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: "i" };
    }
    const sort = () => {
      switch (sortQuery?.toLowerCase()) {
        case "views":
          return { views: -1 };
        case "newest":
          return { createdAt: -1 };
        case "likes":
          return { likes: -1 };
        default:
          return {};
      }
    };

    const videos = await Video.find(filter)
      .populate("author", "username img subscribers clerkId")
      .sort(sort())
      .limit(Number(limit) || 0);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVideo = async (req, res) => {
  const id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid video ID format" });
  }

  const video = await Video.findById(id).populate(
    "author",
    "username img subscribers clerkId"
  );

  if (!video) return res.status(404).json({ error: "Video not found" });



  res.status(200).json(video);
};

export const createVideo = async (req, res) => {
  const newVideo = await Video.create(req.body);
  const video = await newVideo.save();
  if (!video) return res.status(500).json({ error: "Internal server error" });

  await Category.findOneAndUpdate(
    {
      title: video.category.charAt(0).toUpperCase() + video.category.slice(1),
    },
    {
      $push: { videos: video._id },
    }
  );

  await User.findOneAndUpdate(video.author._id, {
    $push: { videos: video._id },
  });

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

export const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findByIdAndDelete(videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    await Category.findOneAndUpdate(
      {
        title: video.category.charAt(0).toUpperCase() + video.category.slice(1),
      },
      { $pull: { videos: video._id } }
    );

    await User.findOneAndUpdate(video.author._id, {
      $pull: { videos: video._id },
    });

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting video" });
  }
};
