import dotenv from 'dotenv';
import express from 'express';
import { productRouter } from './src/routers/product.router.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5252;

app.use(express.json());

app.use(productRouter);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
