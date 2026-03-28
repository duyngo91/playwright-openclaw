import { test, expect } from '@playwright/test';
import { getRandomInt, getRandomUUID } from '../random';

test.describe('Random utility functions', () => {
  test('getRandomInt returns integer within range (1-10)', () => {
    for (let i = 0; i < 100; i++) {
      const val = getRandomInt();
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
    }
  });

  test('getRandomUUID returns a valid v4 UUID string', () => {
    const uuid = getRandomUUID();
    // UUID v4 pattern: 8-4-4-4-12 hex digits, with version 4 and variant 8,9,A,B
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('getRandomUUID returns unique values', () => {
    const set = new Set<string>();
    for (let i = 0; i < 100; i++) {
      set.add(getRandomUUID());
    }
    expect(set.size).toBe(100);
  });
});