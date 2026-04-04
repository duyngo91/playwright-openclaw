const { test, expect } = require('@playwright/test');
const { formatDate } = require('../utils/dateUtils');

test.describe('Date Utils Test', () => {
    test('Chuyển đổi YYYY-MM-DD sang DD/MM/YYYY', () => {
        const result = formatDate('2026-04-04', 'YYYY-MM-DD', 'DD/MM/YYYY');
        expect(result).toBe('04/04/2026');
    });

    test('Chuyển đổi DD/MM/YYYY sang YYYY-MM-DD', () => {
        const result = formatDate('01/01/2025', 'DD/MM/YYYY', 'YYYY-MM-DD');
        expect(result).toBe('2025-01-01');
    });

    test('Chuyển đổi MM/DD/YYYY sang DD-MM-YYYY', () => {
        const result = formatDate('12/25/2026', 'MM/DD/YYYY', 'DD-MM-YYYY');
        expect(result).toBe('25-12-2026');
    });

    test('Format sai định dạng', () => {
        const result = formatDate('2026-04-04', 'YYYY-MM', 'YYYY-MM-DD');
        expect(result).toBe('Invalid Format');
    });
});
