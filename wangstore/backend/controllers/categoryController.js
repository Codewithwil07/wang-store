import Category from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: 'Name is required' });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: 'Already exists' });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.name = name;

    const updateCategory = await category.save();
    res.json(updateCategory);
  } catch (error) {
    console.error(error);
    return res.status(400).json('Interval server error');
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const remove = await Category.findByIdAndDelete({
      _id: categoryId,
    });
    res.json(remove);
  } catch (error) {}
  console.error(error);
  return res.status(400).json('INternal server error');
});

export { createCategory, updateCategory, removeCategory };
