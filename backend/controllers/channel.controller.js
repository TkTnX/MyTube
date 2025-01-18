import User from "../models/user.model.js";

export const getChannel = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) return res.status(404).json({ error: "User not found" });

    const channel = await User.findOne({ username }).select(
      "-dislikedVideos -likedVideos -subscriptions -watchLater  -email"
    );
    if (!channel) return res.status(404).json({ error: "User not found" });

    res.status(200).json(channel);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const subscribe = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const clerkUserId = req.body.clerkUserId;

    const user = await User.findOne({ clerkId: clerkUserId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const channel = await User.findById(channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    if (user.subscriptions.includes(channelId)) {
      // Remove subscription
      await user.updateOne({ $pull: { subscriptions: channelId } });
      await channel.updateOne({ $pull: { subscribers: user.id } });

      return res
        .status(200)
        .json({ message: "Unsubscribed from channel", subscribed: false });
    } else {
      // Add subscription
      await user.updateOne({ $push: { subscriptions: channelId } });
      await channel.updateOne({ $push: { subscribers: user.id } });

      return res
        .status(200)
        .json({ message: "Subscribed to channel", subscribed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
