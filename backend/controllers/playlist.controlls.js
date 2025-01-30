import Playlist from "../models/playlist.model.js";

export const getPlaylist = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id);

    res.status(200).send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
