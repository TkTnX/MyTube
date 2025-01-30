import Category from "../models/category.model.js";

export const getCategories = async (req, res) => {
  try {
    const query = req.query;

    const QCategory = query.findCategory
      ? query.findCategory.charAt(0).toUpperCase() + query.findCategory.slice(1)
      : null;

    const QPopulateVideos = query.populateVideos
      ? {
          path: "videos",
          populate: {
            path: "author",
            select: "username img subscribers clerkId",
          },
        }
      : "";

    const categories = await Category.find(
      QCategory ? { title: QCategory } : {}
    ).populate(QPopulateVideos);
    if (!categories)
      return res.status(404).json({ error: "Categories not found" });

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
