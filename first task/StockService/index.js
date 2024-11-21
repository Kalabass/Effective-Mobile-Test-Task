import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { productRouter } from './src/routers/product.router.js';
import { stockRouter } from './src/routers/stock.router.js';
import swaggerSpecs from './swagger-config.js';
dotenv.config();
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.json());

app.use(productRouter);
app.use(stockRouter);

const port = process.env.PORT || 5252;

app.listen(port, () => {
  console.log(`server started on ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});
