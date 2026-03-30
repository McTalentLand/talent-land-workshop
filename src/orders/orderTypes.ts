import { MenuItemId } from '../menu/menuTypes';

export type OrderId = string;

export type OrderLineRequest = {
  itemId: MenuItemId;
  quantity: number;
};

export type CreateOrderRequest = {
  customerName: string;
  lines: OrderLineRequest[];
};

export type OrderLine = OrderLineRequest & {
  name: string;
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  id: OrderId;
  customerName: string;
  lines: OrderLine[];
  total: number;
  createdAtIso: string;
};
