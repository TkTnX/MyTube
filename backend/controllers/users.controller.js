import User from "../models/user.model.js";
import cron from "node-cron";
export const getUser = async (req, res) => {
  const populate = req.query.populate;
  const user = await User.findOne({
    clerkId: req.params.id,
  }).populate(
    populate !== undefined
      ? populate === "playlists" || populate === "subscriptions"
        ? { path: populate, populate: { path: "videos", populate: "author" } }
        : { path: populate }
      : ""
  );

  cron.schedule("0 0 * * 0", async () => {
    try {
      await User.updateMany({}, { $set: { history: [] } });
    } catch (error) {
      console.log(error);
    }
  });
  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ error: "No data provided" });

    const currentUser = await User.findOne({
      clerkId: req.params.id,
    });

    if (!currentUser) return res.status(404).json({ error: "User not found" });

    const updatedUser = await User.findOneAndUpdate(
      {
        clerkId: req.params.id,
      },
      {
        coverImg: data.coverImg || currentUser.coverImg,
        description: data.description || currentUser.description,
      }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
