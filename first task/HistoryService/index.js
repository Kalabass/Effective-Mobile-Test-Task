import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { historyRouter } from './src/routers/history.router.js';
import { historyService } from './src/services/history.service.js';
import swaggerSpecs from './swagger-config.js';
dotenv.config();
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.json());

app.use(historyRouter);

const port = process.env.PORT || 5253;

app.listen(port, () => {
  historyService.startListening();
  console.log(`server started on ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});
