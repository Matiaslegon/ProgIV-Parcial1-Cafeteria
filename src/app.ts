import express, { type Express, type Request, type Response } from 'express';
import { crearPedidoRoutes } from './routes/PedidoRoutes';
import { PedidoRepository } from './repositories/PedidoRepository';
import { PedidoController } from './controllers/PedidoController';

export function crearApp(): Express {
  const app: Express = express();
  const pedidoRepository = new PedidoRepository();
  const pedidoController = new PedidoController(pedidoRepository);

  app.use(express.json());
  app.use('/pedidos', crearPedidoRoutes(pedidoController));

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
}
