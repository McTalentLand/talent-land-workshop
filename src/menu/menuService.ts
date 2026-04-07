import { MenuItem, MenuItemId } from './menuTypes';
import { MenuRepository } from './menuRepository';

export class MenuService {
  constructor(private readonly repo: MenuRepository) {}

  getMenu(): MenuItem[] {
    return this.repo.getAll();
  }

  getItem(id: MenuItemId): MenuItem | undefined {
    return this.repo.getById(id);
  }
}
