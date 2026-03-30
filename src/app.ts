import express from 'express';
import path from 'path';

import { SAMPLE_MENU } from './menu/sampleMenu';
import { InMemoryMenuRepository } from './menu/menuRepository';
import { MenuService } from './menu/menuService';

import { InMemoryOrderRepository } from './orders/repositories/orderRepository';
import { OrderService } from './orders/orderService';

import { SystemClock } from './shared/clock';

import { createMenuRoutes } from './routes/menuRoutes';
import { createOrderRoutes } from './routes/orderRoutes';

export function createApp() {
  const app = express();
  app.use(express.json());

  // Serve the demo UI
  const publicDir = path.join(__dirname, '..', 'public');
  app.use('/', express.static(publicDir));

  // Compose services (simple DI)
  const menuRepo = new InMemoryMenuRepository(SAMPLE_MENU);
  const menuService = new MenuService(menuRepo);

  const orderRepo = new InMemoryOrderRepository();
  const clock = new SystemClock();
  const orderService = new OrderService(menuService, orderRepo, clock);

  app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

  app.use(createMenuRoutes(menuService));
  app.use(createOrderRoutes(orderService));

  return app;
}
