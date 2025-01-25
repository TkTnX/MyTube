import Comments from "../models/comment.model.js";

export const getComments = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const filterQuery = req.query.filter;
    const filter = filterQuery === "newest" ? { createdAt: -1 } : { likes: -1 };
    const comments = await Comments.find({ video: videoId })
      .sort(filter)
      .populate("author");

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

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comments.findByIdAndDelete(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    return res.status(200).send("Comment deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
