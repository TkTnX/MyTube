import User from "../models/user.model.js";


export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};
