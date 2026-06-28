const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      id: parseInt(req.params.id),
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      image: req.body.image,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({
      id: parseInt(req.params.id),
    });

    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        id: parseInt(req.params.id),
      },
      req.body,
      {
        new: true,
      }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};