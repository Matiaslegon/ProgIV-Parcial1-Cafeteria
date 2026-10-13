import { PedidoController } from '../controllers/PedidoController';
import { Router } from 'express';

export function crearPedidoRoutes(pedidoController: PedidoController): Router {
  const router: Router = Router();
  router.get('/', pedidoController.getPedidos);
  router.post('/', pedidoController.postPedido);
  router.get('/:id', pedidoController.getPedidoPorId);
  return router;
}
