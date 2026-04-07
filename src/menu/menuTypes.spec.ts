import { parseMenuItemId } from './menuTypes';

describe('parseMenuItemId', () => {
  test.each([
    [null],
    [''],
    ['   '],
    ['UPPER'],
    ['too_long_id_too_long_id_too_long_id_too_long'],
    ['bad*chars'],
  ])('rejects %p', (raw) => {
    expect(parseMenuItemId(raw as any)).toBeNull();
  });

  test.each([
    ['bigmac'],
    ['fries-1'],
    ['a1-b2'],
  ])('accepts %p', (raw) => {
    expect(parseMenuItemId(raw as any)).toBe(raw);
  });
});
