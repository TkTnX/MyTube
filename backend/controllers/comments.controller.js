import Comments from "../models/comment.model.js";

export const getComments = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const comments = await Comments.find({ video: videoId }).populate("author");

    if (!comments) return res.status(404).json({ error: "Comments not found" });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const data = req.body;
    if (!data) return res.status(400).json({ error: "No data provided" });

    const comment = await Comments.create({
      video: videoId,
      author: data.author,
      text: data.text,
    });

    if (!comment) return res.status(500).json({ error: "Comment not created" });

    return res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
