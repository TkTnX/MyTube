import mongoose from "mongoose";
import Playlist from "../models/playlist.model.js";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";

export const getPlaylistById = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id).populate("author").populate({
      path: "videos",
      populate: "author",
    });

    res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const username = req.params.username;
    const sort = req.query.sort;
    if (!username) return res.status(404).json({ error: "User not found" });

    const author = await User.findOne({ username });
    if (!author) return res.status(404).json({ error: "Author not found" });

    const playlists = await Playlist.find({ author: author._id })
      .populate("author")
      .populate({
        path: "videos",
        populate: "author",
      })
      .sort(sort === "createdAt" ? { createdAt: -1 } : {});
    res.status(200).send(playlists);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const body = req.body;
    if (!body) return res.status(400).json({ error: "No data provided" });

    const user = await User.findOne({ clerkId: body.authorClerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const playlist = await Playlist.create({ ...body, author: user._id });
    if (!playlist)
      return res.status(400).json({ error: "Playlist not created" });

    await User.findOneAndUpdate(
      { clerkId: body.authorClerkId },
      {
        $push: { playlists: playlist._id },
      }
    );

    res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const id = req.params.id;

    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    await User.findOneAndUpdate(playlist.author._id, {
      $pull: { playlists: playlist._id },
    });

    res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const editPlaylist = async (req, res) => {
  try {
    const body = req.body;
    const playlistId = req.params.id;
    if (!body) return res.status(400).json({ error: "No data provided" });

    const user = await User.findOne({ clerkId: body.authorClerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const playlistObjectId = new mongoose.Types.ObjectId(playlistId);

    const playlist = await Playlist.findOneAndUpdate(playlistObjectId, body);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const addVideoToPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const videoId = req.params.videoId;

    if (!playlistId || !videoId)
      return res.status(400).json({ error: "No id provided" });

    const playlistObjectId = new mongoose.Types.ObjectId(playlistId);
    const videoObjectId = new mongoose.Types.ObjectId(videoId);

    const playlist = await Playlist.findOne(playlistObjectId);
    if (!playlist || !playlist._id)
      return res.status(404).json({ error: "Playlist not found" });

    const video = await Video.findOne(videoObjectId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (playlist.videos.includes(video._id)) {
      await Playlist.findOneAndUpdate(playlist._id, {
        $pull: { videos: video._id },
      });

      return res.status(200).send(playlist);
    }

    await Playlist.findOneAndUpdate(playlist._id, {
      $push: { videos: video._id },
    });

    return res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
