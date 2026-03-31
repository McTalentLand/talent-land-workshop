import { InMemoryMenuRepository } from '../menu/menuRepository';
import { MenuService } from '../menu/menuService';
import { SAMPLE_MENU } from '../menu/sampleMenu';
import { InMemoryOrderRepository } from './repositories/orderRepository';
import { OrderService } from './orderService';
import type { Clock } from '../shared/clock';
import type { Order } from './orderTypes';

class FixedClock implements Clock {
  constructor(private readonly iso: string) {}
  nowIso(): string { return this.iso; }
}

describe('OrderService', () => {
  test('creates an order and calculates totals', () => {
    // Arrange
    const menuService = new MenuService(new InMemoryMenuRepository(SAMPLE_MENU));
    const repo = new InMemoryOrderRepository();
    const clock = new FixedClock('2026-01-01T00:00:00.000Z');
    const svc = new OrderService(menuService, repo, clock);

    // Act
    const result = svc.create({ customerName: 'Ronald', lines: [{ itemId: 'bigmac', quantity: 2 }] });

    // Assert
    expect(result.status).toBe(201);
    expect(result.body.total).toBe(110);
    expect(result.body.createdAtIso).toBe('2026-01-01T00:00:00.000Z');
  });

  test.each([
    [{ customerName: '', lines: [{ itemId: 'bigmac', quantity: 1 }] }],
    [{ customerName: 'X', lines: [] }],
    [{ customerName: 'X', lines: [{ itemId: 'bigmac', quantity: 0 }] }],
    [{ customerName: 'X', lines: [{ itemId: 'unknown', quantity: 1 }] }],
  ])('validates payload (%p)', (payload) => {
    const menuService = new MenuService(new InMemoryMenuRepository(SAMPLE_MENU));
    const repo = new InMemoryOrderRepository();
    const clock = new FixedClock('2026-01-01T00:00:00.000Z');
    const svc = new OrderService(menuService, repo, clock);

    const result = svc.create(payload as any);
    expect(result.status).toBe(400);
    expect(result.body.error).toBeTruthy();
  });

  describe('getAll', () => {
    test('returns an empty list when there are no orders', () => {
      const menuService = new MenuService(new InMemoryMenuRepository(SAMPLE_MENU));
      const repo = new InMemoryOrderRepository();
      const clock = new FixedClock('2026-01-01T00:00:00.000Z');
      const svc = new OrderService(menuService, repo, clock);

      const result = svc.getAll();

      expect(result.status).toBe(200);
      expect(result.body).toEqual([]);
    });

    test('returns all saved orders', () => {
      const menuService = new MenuService(new InMemoryMenuRepository(SAMPLE_MENU));
      const repo = new InMemoryOrderRepository();
      const clock = new FixedClock('2026-01-01T00:00:00.000Z');
      const svc = new OrderService(menuService, repo, clock);

      const order1: Order = {
        id: 'order-1',
        customerName: 'Ronald',
        lines: [],
        total: 0,
        createdAtIso: '2026-01-01T00:00:00.000Z',
      };
      const order2: Order = {
        id: 'order-2',
        customerName: 'Minnie',
        lines: [],
        total: 0,
        createdAtIso: '2026-01-01T00:00:00.000Z',
      };
      repo.save(order1);
      repo.save(order2);

      const result = svc.getAll();

      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(2);
      expect(result.body).toEqual(expect.arrayContaining([order1, order2]));
    });
  });
});
