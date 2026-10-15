
import type { Request, Response } from 'express';
import type { IProductoRepository } from '../repositories/ProductoRepository.ts';

export class ProductosController {
  constructor(private readonly repo: IProductoRepository) {}

  listar = (_req: Request, res: Response): void => {
    res.status(200).json(this.repo.obtenerTodos());
  };

  obtenerPorId = (req: Request, res: Response): void => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: 'El id debe ser un entero positivo' });
      return;
    }

    const producto = this.repo.obtenerPorId(id);
    if (!producto) {
      res.status(404).json({ error: `Producto ${id} no encontrado` });
      return;
    }

    res.status(200).json(producto);
  };
}