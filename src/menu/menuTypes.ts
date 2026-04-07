export type MenuItemId = string;

export type MenuItem = {
  id: MenuItemId;
  name: string;
  price: number;
};

export function parseMenuItemId(raw: unknown): MenuItemId | null {
  if (typeof raw !== 'string') return null;
  const id = raw.trim();
  if (id.length === 0) return null;
  // keep it simple for workshop: lowercase letters, numbers, dash
  if (!/^[a-z0-9-]{1,32}$/.test(id)) return null;
  return id;
}
