import { Router } from 'express';
import type { ProductosController } from '../controllers/ProductoController.ts';

export function crearProductosRouter(controller: ProductosController): Router {
  const router = Router();
  router.get('/', controller.listar);
  router.get('/:id', controller.obtenerPorId);
  return router;
}