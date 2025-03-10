import { formatArea, formatPrice } from './number';

describe('Number utilities', () => {
  describe('formatPrice', () => {
    it('should format a price with $ symbol and thousand separators', () => {
      expect(formatPrice(1000)).toBe('$1,000');
      expect(formatPrice(1500)).toBe('$1,500');
      expect(formatPrice(1000000)).toBe('$1,000,000');
    });

    it('should handle decimal values', () => {
      expect(formatPrice(1000.5)).toBe('$1,000.5');
      expect(formatPrice(1000.55)).toBe('$1,000.55');
    });

    it('should handle zero', () => {
      expect(formatPrice(0)).toBe('$0');
    });

    it('should handle negative values', () => {
      expect(formatPrice(-1000)).toBe('$-1,000');
    });
  });

  describe('formatArea', () => {
    it('should format area with sq.ft unit', () => {
      expect(formatArea(1000)).toBe('1000 sq.ft');
      expect(formatArea(1500)).toBe('1500 sq.ft');
    });

    it('should handle decimal values', () => {
      expect(formatArea(1000.5)).toBe('1000.5 sq.ft');
    });

    it('should handle zero', () => {
      expect(formatArea(0)).toBe('0 sq.ft');
    });
  });
});
