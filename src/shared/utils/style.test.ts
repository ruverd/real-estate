/* eslint-disable no-constant-binary-expression */
import { cn } from './style';

describe('Style utilities', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');

      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');

      expect(result).toBe('base-class active-class');
    });

    it('should handle falsy values', () => {
      const result = cn('base-class', false && 'should-not-appear', null, undefined, 0);

      expect(result).toBe('base-class');
    });

    it('should handle arrays of classes', () => {
      const result = cn('base-class', ['nested-class', 'another-class']);

      expect(result).toBe('base-class nested-class another-class');
    });

    it('should handle objects with conditional classes', () => {
      const result = cn('base-class', { 
        'active-class': true, 
        'inactive-class': false 
      });

      expect(result).toBe('base-class active-class');
    });

    it('should properly merge conflicting Tailwind classes', () => {
      const result = cn('p-2 p-4', 'text-red-500 text-blue-500');

      expect(result).toBe('p-4 text-blue-500');
    });

    it('should handle complex nested structures', () => {
      const result = cn(
        'base-class',
        ['array-class-1', 'array-class-2'],
        { 'object-true-class': true, 'object-false-class': false },
        null,
        undefined,
        ['nested-array', { 'nested-object-class': true }]
      );

      expect(result).toBe('base-class array-class-1 array-class-2 object-true-class nested-array nested-object-class');
    });

    it('should properly handle variant classes', () => {
      const result = cn('hover:text-red-500', 'hover:text-blue-500');

      expect(result).toBe('hover:text-blue-500');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      
      expect(result).toBe('');
    });
  });
});
