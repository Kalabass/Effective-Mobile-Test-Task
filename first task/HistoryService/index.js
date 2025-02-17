import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url'; // Импортируйте fileURLToPath
import { historyRouter } from './src/routers/history.router.js';
import { historyService } from './src/services/history.service.js';
import swaggerSpecs from './swagger-config.js';

dotenv.config();
const app = express();

// Получите путь к текущему модулю
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const manifestPath = path.join(__dirname, 'manifest.json');

app.get('/manifest.json', (req, res) => {
  res.sendFile(manifestPath);
});

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
