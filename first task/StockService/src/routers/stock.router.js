import { Router } from 'express';
import { stockController } from '../controllers/stock.controller.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';
import { validateStock } from '../validators/stock.validator.js';

const stockRouter = new Router();

stockRouter.post('/stock/filtered', stockController.getFIlteredStock);
stockRouter.post(
  '/stock',
  validateStock,
  handleValidationErrors,
  stockController.createStock
);
stockRouter.patch(
  '/stock/increase',
  validateStock,
  handleValidationErrors,
  stockController.increaseStock
);
stockRouter.patch(
  '/stock/decrease',
  validateStock,
  handleValidationErrors,
  stockController.decreaseStock
);

export { stockRouter };
