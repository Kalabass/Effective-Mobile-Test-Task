import { historyRepository } from '../repositories/history.repository.js';

class HistoryController {
  ErrorHandler = (error, res, message) => {
    console.error(error);
    res.status(500).json({
      message: message,
    });
  };

  getFilteredHistory = async (req, res) => {
    try {
      const {
        shop_id,
        plu,
        action,
        date_from,
        date_to,
        page = 1,
        limit = 10,
      } = req.body;
      const offset = (page - 1) * limit;

      const { data, total } = await historyRepository.getFilteredHistory({
        shop_id,
        plu,
        action,
        date_from,
        date_to,
        limit,
        offset,
      });

      res.status(200).json({
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during getting filtered history');
    }
  };
}

export const historyController = new HistoryController();
