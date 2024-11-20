import dotenv from 'dotenv';
import express from 'express';
import { historyRouter } from './src/routers/history.router.js';
import { historyService } from './src/services/history.service.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5253;

app.use(express.json());

app.use(historyRouter);

app.listen(port, () => {
  historyService.startListening();
  console.log(`server started on ${port}`);
});
