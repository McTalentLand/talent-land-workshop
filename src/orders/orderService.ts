import { v4 as uuid } from 'uuid';
import { MenuService } from '../menu/menuService';
import { parseMenuItemId } from '../menu/menuTypes';
import { toError } from '../shared/apiError';
import { Clock } from '../shared/clock';
import { CreateOrderRequest, Order, OrderId } from './orderTypes';
import { OrderRepository } from './repositories/orderRepository';

export class OrderService {
  constructor(
    private readonly menuService: MenuService,
    private readonly orderRepo: OrderRepository,
    private readonly clock: Clock
  ) {}

  create(payload: unknown) {
    const parsed = this.parseCreateRequest(payload);
    if (!parsed.ok) return parsed.error;

    const lines = parsed.value.lines.map(l => {
      const item = this.menuService.getItem(l.itemId);
      // menuService will return undefined only if menu changed; validate anyway
      if (!item) return { missing: l.itemId } as const;
      return {
        itemId: l.itemId,
        quantity: l.quantity,
        name: item.name,
        unitPrice: item.price,
        lineTotal: item.price * l.quantity,
      };
    });

    const missing = lines.find((x: any) => 'missing' in x);
    if (missing) return toError(400, 'VALIDATION_ERROR', `Unknown menu item: ${(missing as any).missing}`);

    const total = lines.reduce((s: number, l: any) => s + l.lineTotal, 0);
    const order: Order = {
      id: uuid(),
      customerName: parsed.value.customerName,
      lines: lines as any,
      total,
      createdAtIso: this.clock.nowIso(),
    };

    this.orderRepo.save(order);
    return { status: 201, body: order };
  }

  getById(id: string) {
    const order = this.orderRepo.getById(id as OrderId);
    if (!order) return toError(404, 'NOT_FOUND', 'Order not found');
    return { status: 200, body: order };
  }

  getAll() {
    const orders = this.orderRepo.getAll();
    return { status: 200, body: orders };
  }

  private parseCreateRequest(payload: unknown): { ok: true; value: CreateOrderRequest } | { ok: false; error: any } {
    if (!payload || typeof payload !== 'object') {
      return { ok: false, error: toError(400, 'VALIDATION_ERROR', 'Payload must be an object') };
    }
    const p: any = payload;
    const customerName = typeof p.customerName === 'string' ? p.customerName.trim() : '';
    if (customerName.length === 0) {
      return { ok: false, error: toError(400, 'VALIDATION_ERROR', 'customerName is required') };
    }
    if (!Array.isArray(p.lines) || p.lines.length === 0) {
      return { ok: false, error: toError(400, 'VALIDATION_ERROR', 'lines must be a non-empty array') };
    }

    const lines = p.lines.map((l: any) => {
      const itemId = parseMenuItemId(l?.itemId);
      const quantity = Number(l?.quantity);
      return { itemId, quantity };
    });

    const badLine = lines.find((l: any) => !l.itemId || !Number.isInteger(l.quantity) || l.quantity <= 0);
    if (badLine) {
      return { ok: false, error: toError(400, 'VALIDATION_ERROR', 'Each line must have valid itemId and quantity > 0') };
    }

    return {
      ok: true,
      value: { customerName, lines: lines as any },
    };
  }
}
