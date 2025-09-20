const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

/**
 * @swagger
 * tags:
 *   name: Suppliers
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get list of suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: list
 */
router.get('/', supplierController.index);
router.get('/new', supplierController.newForm);
router.post('/', supplierController.create);
router.get('/:id/edit', supplierController.editForm);
router.put('/:id', supplierController.update);
router.delete('/:id', supplierController.destroy);

module.exports = router;
