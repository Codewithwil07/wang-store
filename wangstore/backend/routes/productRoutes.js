import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// controller
import { addProduct, updateProduct } from '../controllers/productController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

router.route('/').post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route('/:id')
  .put(authenticate, authorizeAdmin, formidable(), updateProduct);

export default router;
