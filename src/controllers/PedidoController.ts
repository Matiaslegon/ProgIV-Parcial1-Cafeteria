import { PedidoRepository } from '../repositories/PedidoRepository';
import { Request, Response } from 'express';
import { z } from 'zod';

const crearPedidoSchema = z.object({
  items: z
    .array(
      z.object({
        productoId: z
          .number('productoId debe ser un número')
          .int('productoId debe ser entero')
          .positive('productoId debe ser mayor a 0'),
        cantidad: z
          .number('cantidad debe ser un número')
          .int('cantidad debe ser entera')
          .positive('cantidad debe ser mayor a 0'),
      }),
      'items debe ser un arreglo',
    )
    .min(1, 'El pedido debe contener al menos un item'),
  estado: z.enum(['pendiente', 'entregado', 'cancelado'], 'estado inválido').optional(),
});

export class PedidoController {
  constructor(private pedidoRepository: PedidoRepository) {}

  getPedidos = (req: Request, res: Response): Response => {
    try {
      const pedidos = this.pedidoRepository.obtenerTodos();
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      return res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  };

  postPedido = (req: Request, res: Response): Response => {
    try {
      const parsed = crearPedidoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: z.treeifyError(parsed.error) });
      }
      const pedidoCreado = this.pedidoRepository.crear(parsed.data);
      return res.status(201).json(pedidoCreado);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      return res.status(500).json({ error: 'Error al crear el pedido' });
    }
  };

  getPedidoPorId = (req: Request, res: Response): Response => {
    try {
      const { id } = req.params;
      const pedido = this.pedidoRepository.obtenerPorId(Number(id));
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      return res.status(200).json(pedido);
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
      return res.status(500).json({ error: 'Error al obtener el pedido' });
    }
  };
}
