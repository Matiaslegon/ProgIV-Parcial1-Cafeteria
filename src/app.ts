import express, { type Express, type Request, type Response } from 'express';
import { crearPedidoRoutes } from './routes/PedidoRoutes';
import { PedidoRepository } from './repositories/PedidoRepository';
import { PedidoController } from './controllers/PedidoController';
import { crearProductosRouter } from './routes/ProductoRoutes';
import { ProductoRepository } from './repositories/ProductoRepository';
import { ProductosController } from './controllers/ProductoController';
import { PedidoService } from './services/PedidoService';

export function crearApp(): Express {
  const app: Express = express();
  const productosRepository = new ProductoRepository();
  const productosController = new ProductosController(productosRepository);
  const pedidoRepository = new PedidoRepository();
  const pedidoService = new PedidoService(pedidoRepository, productosRepository);
  const pedidoController = new PedidoController(pedidoService);

  app.use(express.json());
  app.use('/pedidos', crearPedidoRoutes(pedidoController));
  app.use('/productos', crearProductosRouter(productosController));

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
}
