import { MenuItem, MenuItemId } from './menuTypes';

export interface MenuRepository {
  getAll(): MenuItem[];
  getById(id: MenuItemId): MenuItem | undefined;
}

export class InMemoryMenuRepository implements MenuRepository {
  constructor(private readonly items: MenuItem[]) {}

  getAll(): MenuItem[] {
    return [...this.items];
  }

  getById(id: MenuItemId): MenuItem | undefined {
    console.log(JSON.stringify(this.items));
    return this.items.find(i => i.id === id);
  }
}
