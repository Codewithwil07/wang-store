import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: 'Name is required' });
      case !description:
        return res.json({ error: 'Description is required' });
      case !price:
        return res.json({ error: 'Price is required' });
      case !category:
        return res.json({ error: 'Category is required' });
      case !quantity:
        return res.json({ error: 'Quantity is required' });
      case !brand:
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: 'Name is required' });
      case !description:
        return res.json({ error: 'Description is required' });
      case !price:
        return res.json({ error: 'Price is required' });
      case !category:
        return res.json({ error: 'Category is required' });
      case !quantity:
        return res.json({ error: 'Quantity is required' });
      case !brand:
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const fecthProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $opptions: 'i' } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found' });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    let product = await Product.findById(req.params.id);

    if (product) {
      let alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).send({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message || error);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1}).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

export {
  addProduct,
  updateProduct,
  removeProduct,
  fecthProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
};
