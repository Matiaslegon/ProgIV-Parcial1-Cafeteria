import { ReporteService } from '../services/ReporteService';
import { Request, Response } from 'express';

export class ReporteController {
  constructor(private reporteService: ReporteService) {}

  getReporte = (_req: Request, res: Response): Response => {
    try {
      const reporte = this.reporteService.obtenerReporte();
      return res.status(200).json(reporte);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
      return res.status(500).json({ error: 'Error al obtener el reporte' });
    }
  };
}
