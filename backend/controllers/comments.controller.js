import Comments from "../models/comment.model.js";

export const getComments = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const filterQuery = req.query.filter;
    const filter = filterQuery === "newest" ? { createdAt: -1 } : { likes: -1 };
    const comments = await Comments.find({ video: videoId })
      .sort(filter)
      .populate("author")
      .populate({
        path: "replies",
        populate: "author",
      });

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
    await Comments.deleteMany({
      replyTo: commentId,
    });
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    return res.status(200).send("Comment deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const likeComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.body.userId;

    const comment = await Comments.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.likes.includes(userId)) {
      await comment.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({
        likes: comment.likes.length - 1,
        dislikes: comment.dislikes.length,
      });
    } else {
      if (comment.dislikes.includes(userId)) {
        await comment.updateOne({
          $pull: { dislikes: userId },
          $push: { likes: userId },
        });

        return res.status(200).json({
          likes: comment.likes.length + 1,
          dislikes: comment.dislikes.length - 1,
        });
      }

      await comment.updateOne({ $push: { likes: userId } });
      return res.status(200).json({
        likes: comment.likes.length + 1,
        dislikes: comment.dislikes.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const dislikeComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.body.userId;

    const comment = await Comments.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.dislikes.includes(userId)) {
      await comment.updateOne({ $pull: { dislikes: userId } });
      return res.status(200).json({
        dislikes: comment.dislikes.length - 1,
        likes: comment.likes.length,
      });
    } else {
      if (comment.likes.includes(userId)) {
        await comment.updateOne({
          $pull: { likes: userId },
          $push: { dislikes: userId },
        });

        return res.status(200).json({
          likes: comment.likes.length - 1,
          dislikes: comment.dislikes.length + 1,
        });
      }

      await comment.updateOne({ $push: { dislikes: userId } });
      return res.status(200).json({
        dislikes: comment.dislikes.length + 1,
        likes: comment.likes.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const answerComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const data = req.body;
    if (!data) return res.status(400).json({ error: "No data provided" });

    const comment = await Comments.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const answer = await Comments.create({
      video: comment.video._id,
      author: data.author,
      text: data.text,
      replyTo: comment._id,
    });

    if (!answer) return res.status(500).json({ error: "Answer not created" });

    await comment.updateOne({ $push: { replies: answer._id } });

    return res.status(200).send(answer);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
