import { productRepository } from '../repositories/product.repository.js';
import { stockRepository } from '../repositories/stock.repository.js';

export class ProductController {
  ErrorHandler = (error, res, message) => {
    console.error(error);
    res.status(500).json({
      message: message,
    });
  };

  createProduct = async (req, res) => {
    try {
      const newProduct = await productRepository.createProduct({ ...req.body });

      res.status(201).json({ data: newProduct });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during creating product');
    }
  };

  createStock = async (req, res) => {
    try {
      const newStock = await stockRepository.createStock({ ...req.body });
      res.status(201).json({ data: newStock });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during creating stock');
    }
  };

  increaseStock = async (req, res) => {
    try {
      const updatedStock = await stockRepository.increaseStock({ ...req.body });

      if (!updatedStock) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      res.status(200).json({ data: updatedStock });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during increasing  stock');
    }
  };

  decreaseStock = async (req, res) => {
    try {
      const updatedStock = await stockRepository.decreaseStock({ ...req.body });

      if (!updatedStock) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      res.status(200).json(updatedStock);
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during decreasing  stock');
    }
  };

  getFIlteredStock = async (req, res) => {
    try {
      const { amount_in_shop, amount_in_order, PLU, shop_id } = req.body;

      const { min: minShop = null, max: maxShop = null } = amount_in_shop || {};
      const { min: minOrder = null, max: maxOrder = null } =
        amount_in_order || {};

      const stocks = await stockRepository.getFilteredStock({
        minOrder: minOrder,
        maxOrder: maxOrder,
        minShop: minShop,
        maxShop: maxShop,
        PLU: PLU,
        shop_id: shop_id,
      });

      res.status(200).json({ data: stocks });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during getting filtered stock');
    }
  };

  getFilteredProducts = async (req, res) => {
    try {
      const result = await productRepository.getFilteredProducts({
        ...req.query,
      });

      res.status(200).json({ data: result });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during getting products');
    }
  };
}
