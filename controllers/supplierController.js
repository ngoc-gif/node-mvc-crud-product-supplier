const Supplier = require('../models/Supplier');

module.exports = {
  index: async (req, res, next) => {
    try {
      const suppliers = await Supplier.find({});
      res.render('suppliers/index', { suppliers });
    } catch (err) { next(err); }
  },

  newForm: (req, res) => {
    res.render('suppliers/new');
  },

  create: async (req, res, next) => {
    try {
      const { name, address, phone } = req.body;
      await Supplier.create({ name, address, phone });
      res.redirect('/suppliers');
    } catch (err) { next(err); }
  },

  editForm: async (req, res, next) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) return res.status(404).send('Not found');
      res.render('suppliers/edit', { supplier });
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      const { name, address, phone } = req.body;
      await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
      res.redirect('/suppliers');
    } catch (err) { next(err); }
  },

  destroy: async (req, res, next) => {
    try {
      await Supplier.findByIdAndDelete(req.params.id);
      res.redirect('/suppliers');
    } catch (err) { next(err); }
  }
};
