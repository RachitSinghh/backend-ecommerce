const Product = require("../models/product.js");
const { sequelize } = require("../models/product.js");

// @desc Create a new product (admin only)
// @route  POST /api/products
// @access Private/Admin

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, countInStock } =
      req.body;

    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl,
      countInStock,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// @desc Get all products
// @routes GET /api/products
// @access PUBLIC
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.json(product);
  } catch (err) {
    console.error(err);
    req.status(500).json({ message: "Failed to fetch products" });
  }
};

// @desc Get Single product by ID
// @route GET /api/products/:id
// @access PUBLIC
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// allows admin to update an existing product's details
// @desc Update a product
// @route PUT /api/products/:id
/// @access PRIVATE/Admin

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update(req.body);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// allows admin to delete product
// @desc Delete a product
// @route DELETE /api/products/:id
// @access PRIVATE/Admin

exports.deleteProduct = async (req, res) => {
 

  const { id } = req.params;

  try {
    const productsToDelete = await Product.findByPk(id);
    if (!productsToDelete) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // delete the product
    await productsToDelete.destroy();

    //Re-fetch all products and reassign IDs;
    const allProducts = await Product.findAll({ order: [["id", "ASC"]] });

    for (let i = 0; i < allProducts.length; i++) {
      await allProducts[i].update({ id: 1 + i });
    }

    return res.json({msg: "Product deleted and IDs reassigned"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

 // try {
  //   const product = await Product.findByPk(req.params.id);

  //   if (!product) return res.status(404).json({ message: "Product not found" });

  //   await product.destroy();

  //   res.json({ message: "Product deleted succesfully" });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: "Failed to delete product" });
  // }