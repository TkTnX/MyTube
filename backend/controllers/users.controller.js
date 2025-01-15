import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  const user = await User.findOne({
    clerkId: req.params.id,
  });
  res.status(200).json(user);
};
