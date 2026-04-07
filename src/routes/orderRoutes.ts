import { Router } from 'express';
import { OrderService } from '../orders/orderService';

export function createOrderRoutes(orderService: OrderService) {
  const router = Router();

  router.post('/orders', (req, res) => {
    const result = orderService.create(req.body);
    res.status(result.status).json(result.body);
  });

  router.get('/orders/:id', (req, res) => {
    const result = orderService.getById(req.params.id);
    res.status(result.status).json(result.body);
  });

  return router;
}
