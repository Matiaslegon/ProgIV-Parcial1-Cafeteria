import { Router } from 'express';
import { ReporteController } from '../controllers/ReporteController';

export function crearReporteRoutes(reporteController: ReporteController): Router {
  const router: Router = Router();
  router.get('/', reporteController.getReporte);
  return router;
}
