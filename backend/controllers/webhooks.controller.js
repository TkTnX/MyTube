import { Webhook } from "svix";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";

export const clerkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY;
  if (!WEBHOOK_SECRET) throw new Error("Missing Webhook Secret");

  const payload = req.body;
  const headers = req.headers;
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid payload" });
  }

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.image_url,
    });

    await newUser.save();
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findByIdAndDelete(evt.data.id);
    console.log(evt);
    await Video.deleteMany({
      author: {
        _id: deletedUser._id,
      },
    });
  }

  res.json(evt);
};
