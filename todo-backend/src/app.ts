import express from 'express';
import cors from 'cors';
import { todoRouter } from './router';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/todos', todoRouter);

  return app;
};
