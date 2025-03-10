// vitest.setup.ts
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Define ResizeObserver globally
window.ResizeObserver = ResizeObserverMock;
