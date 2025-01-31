import mongoose from "mongoose";
import Playlist from "../models/playlist.model.js";
import User from "../models/user.model.js";

export const getPlaylistById = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id);

    res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) return res.status(404).json({ error: "User not found" });

    const author = await User.findOne({ username });
    if (!author) return res.status(404).json({ error: "Author not found" });

    const playlists = await Playlist.find({ author: author._id })
      .populate("author")
      .populate({
        path: "videos",
        populate: "author",
      });
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

    const authorObjectId = new mongoose.Types.ObjectId(body.author);

    const playlist = await Playlist.create(body);
    if (!playlist)
      return res.status(400).json({ error: "Playlist not created" });

    await User.findOneAndUpdate(authorObjectId, {
      $push: { playlists: playlist._id },
    });

    res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
