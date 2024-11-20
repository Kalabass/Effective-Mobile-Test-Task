import { stockActions } from '../constants/stockActions.const.js';
import { productRepository } from '../repositories/product.repository.js';
import { shopRepository } from '../repositories/shop.repository.js';
import { stockRepository } from '../repositories/stock.repository.js';
import { inventoryService } from '../services/inventory.service.js';

class StockController {
  ErrorHandler = (error, res, message) => {
    console.error(error);
    res.status(500).json({
      message: message,
    });
  };

  createStock = async (req, res) => {
    try {
      const { plu, shop_id } = req.body;

      const product = await productRepository.getOneProduct(plu);

      if (!product)
        return res.status(404).json({ message: 'Product not found' });

      const shop = await shopRepository.getOneShop(shop_id);
      if (!shop) return res.status(404).json({ message: 'Shop not found' });

      const stock = await stockRepository.getOneStock(plu, shop_id);

      if (stock)
        return res.status(400).json({ message: 'A stock already exists' });

      const newStock = await stockRepository.createStock({ ...req.body });

      inventoryService.processAction(stockActions.CREATE, newStock);

      return res.status(201).json({ data: newStock });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during creating stock');
    }
  };

  increaseStock = async (req, res) => {
    try {
      const updatedStock = await stockRepository.increaseStock({
        ...req.body,
      });

      if (!updatedStock) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      inventoryService.processAction(stockActions.INCREASE, updatedStock);

      return res.status(200).json({ data: updatedStock });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during increasing  stock');
    }
  };

  decreaseStock = async (req, res) => {
    try {
      const updatedStock = await stockRepository.decreaseStock({
        ...req.body,
      });

      if (!updatedStock) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      inventoryService.processAction(stockActions.DECREASE, updatedStock);

      return res.status(200).json({ data: updatedStock });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during decreasing  stock');
    }
  };

  getFIlteredStock = async (req, res) => {
    try {
      const { amount_in_shop, amount_in_order, plu, shop_id } = req.body;

      const { min: minShop = null, max: maxShop = null } = amount_in_shop || {};
      const { min: minOrder = null, max: maxOrder = null } =
        amount_in_order || {};

      const stocks = await stockRepository.getFilteredStock({
        minOrder: minOrder,
        maxOrder: maxOrder,
        minShop: minShop,
        maxShop: maxShop,
        plu: plu,
        shop_id: shop_id,
      });

      return res.status(200).json({ data: stocks });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during getting filtered stock');
    }
  };
}

export const stockController = new StockController();
