import Category from "../models/category.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories)
      return res.status(404).json({ error: "Categories not found" });

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
