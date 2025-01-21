import { Webhook } from "svix";
import User from "../models/user.model.js";

// TODO: Комментарии
export const clerkWebhook = async (req, res) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET_KEY;

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(secret);
  let evt;
  try {
    evt = await wh.verify(payload, headers);
  } catch (err) {
    console.error(err);
    res.status(400).json({});
  }

  if (evt.type === "user.created") {
    console.log(evt.data.email_addresses[0]);
    const newUser = new User({
      clerkId: evt.data.id,
      username: evt.data.username,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.image_url,
    });

    await newUser.save();
  }

  if (evt.type === "user.deleted") {
    console.log(evt.data);
    await User.deleteOne({ clerkId: evt.data.id });
  }

  res.status(200).json("Webhook received");
};
