import { Router } from 'express';
import { MenuService } from '../menu/menuService';

export function createMenuRoutes(menuService: MenuService) {
  const router = Router();

  router.get('/menu', (_req, res) => {
    res.status(200).json({ items: menuService.getMenu() });
  });

  return router;
}
