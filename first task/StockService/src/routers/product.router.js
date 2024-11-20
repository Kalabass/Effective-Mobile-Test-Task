import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';
import { validateProduct } from '../validators/product.validator.js';

const productRouter = new Router();

productRouter.post(
  '/products',
  validateProduct,
  handleValidationErrors,
  productController.createProduct
);

productRouter.get('/products', productController.getFilteredProducts);

export { productRouter };
