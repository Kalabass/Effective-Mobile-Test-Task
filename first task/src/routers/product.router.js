import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';
import { validateProduct } from '../validators/product.validator.js';
import { validateStock } from '../validators/stock.validator.js';

const productRouter = new Router();
const productController = new ProductController();

productRouter.post(
  '/products',
  validateProduct,
  handleValidationErrors,
  productController.createProduct
);
productRouter.get('/products', productController.getFilteredProducts);

productRouter.post('/stock/filtered', productController.getFIlteredStock);
productRouter.post(
  '/stock',
  validateStock,
  handleValidationErrors,
  productController.createStock
);
productRouter.patch(
  '/stock/increase',
  validateStock,
  handleValidationErrors,
  productController.increaseStock
);
productRouter.patch(
  '/stock/decrease',
  validateStock,
  handleValidationErrors,
  productController.decreaseStock
);
export { productRouter };
