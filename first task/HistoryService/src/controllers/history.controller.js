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
      const history = await historyRepository.getFilteredHistory({
        ...req.body,
      });

      return res.status(200).json({ data: history });
    } catch (error) {
      this.ErrorHandler(error, res, 'Error during getting filtered history');
    }
  };
}

export const historyController = new HistoryController();
