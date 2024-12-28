import express from "express";
import videosRoute from "./routes/videos.route.js";
import usersRoute from "./routes/user.route.js";
import webhooksRoute from "./routes/webhooks.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use("/webhooks", webhooksRoute);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json(process.env.CLIENT_URL));

const PORT = 3000;

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong",
    status: error.status || 500,
    stack: error.stack,
  });
});

app.use("/videos", videosRoute);
app.use("/users", usersRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started at localhost:${PORT}`);
});
