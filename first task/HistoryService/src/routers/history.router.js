import { Router } from 'express';
import { historyController } from '../controllers/history.controller.js';

const historyRouter = new Router();

historyRouter.post('/history', historyController.getFilteredHistory);

export { historyRouter };
