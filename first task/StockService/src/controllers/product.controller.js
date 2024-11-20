import { productActions } from '../constants/productActions.const.js';
import { productRepository } from '../repositories/product.repository.js';
import { inventoryService } from '../services/inventory.service.js';

class ProductController {
  ErrorHandler = (error, res, message) => {
    console.error(error);
    res.status(500).json({
      message: message,
    });
  };

  createProduct = async (req, res) => {
    try {
      const product = await productRepository.getOneProduct(req.body.plu);

      if (product)
        return res.status(400).json({ message: 'A product already exists' });

      const newProduct = await productRepository.createProduct({ ...req.body });

      inventoryService.processAction(productActions.CREATE, newProduct);

      return res.status(201).json({ data: newProduct });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during creating product');
    }
  };

  getFilteredProducts = async (req, res) => {
    try {
      const result = await productRepository.getFilteredProducts({
        ...req.query,
      });

      return res.status(200).json({ data: result });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during getting products');
    }
  };
}

export const productController = new ProductController();
