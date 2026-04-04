const { test, expect } = require('@playwright/test');
const { formatDate } = require('../utils/dateUtils');

test.describe('Date Utils Tests', () => {
    test('Chuyen doi YYYY-MM-DD sang DD/MM/YYYY', () => {
        expect(formatDate('2026-04-04', 'YYYY-MM-DD', 'DD/MM/YYYY')).toBe('04/04/2026');
    });

    test('Chuyen doi DD/MM/YYYY sang YYYY-MM-DD', () => {
        expect(formatDate('01/01/2025', 'DD/MM/YYYY', 'YYYY-MM-DD')).toBe('2025-01-01');
    });

    test('Chuyen doi MM-DD-YYYY sang DD-MM-YYYY', () => {
        expect(formatDate('12-25-2026', 'MM-DD-YYYY', 'DD-MM-YYYY')).toBe('25-12-2026');
    });

    test('Kiem tra ngay hop le', () => {
        expect(formatDate('32/01/2026', 'DD/MM/YYYY', 'YYYY-MM-DD')).toBe('Invalid Date');
    });

    test('Kiem tra tham so rong', () => {
        expect(formatDate('', 'YYYY-MM-DD', 'YYYY-MM-DD')).toBe('');
    });
});
