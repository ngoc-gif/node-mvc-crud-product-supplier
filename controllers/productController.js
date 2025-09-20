const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

module.exports = {
  index: async (req, res, next) => {
    try {
      const products = await Product.find({}).populate('supplier');
      res.render('products/index', { products });
    } catch (err) { next(err); }
  },

  newForm: async (req, res, next) => {
    try {
      const suppliers = await Supplier.find({});
      res.render('products/new', { suppliers });
    } catch (err) { next(err); }
  },

  create: async (req, res, next) => {
    try {
      const { name, price = 0, quantity = 0, supplier } = req.body;
      await Product.create({ name, price, quantity, supplier });
      res.redirect('/products');
    } catch (err) { next(err); }
  },

  editForm: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).send('Not found');
      const suppliers = await Supplier.find({});
      res.render('products/edit', { product, suppliers });
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      const { name, price, quantity, supplier } = req.body;
      await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
      res.redirect('/products');
    } catch (err) { next(err); }
  },

  destroy: async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect('/products');
    } catch (err) { next(err); }
  }
};
