import { Order, OrderId } from '../orderTypes';

export interface OrderRepository {
  save(order: Order): void;
  getById(id: OrderId): Order | undefined;
  getAll(): Order[];
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly byId = new Map<OrderId, Order>();

  save(order: Order): void {
    this.byId.set(order.id, order);
  }

  getById(id: OrderId): Order | undefined {
    return this.byId.get(id);
  }

  getAll(): Order[] {
    return Array.from(this.byId.values());
  }
}
