import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';

// Global test setup
beforeAll(() => {
  // Mock CSS custom properties that are used throughout the app
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: (prop: string) => {
        const customProps: Record<string, string> = {
          '--color-red': '#e00404',
          '--color-blue': '#2196f3',
          '--color-yellow': '#ffd700',
          '--color-black': '#000000',
          '--color-white': '#ffffff',
          '--color-dark-yellow': '#b8860b',
          '--font-size-button': '14px',
          '--font-weight-semibold': '600',
          '--font-size-nav': '16px',
          '--font-size-base': '14px',
          '--font-size-lg': '18px',
          '--font-weight-bold': '700',
        };
        return customProps[prop] || '';
      },
    }),
  });

  // Mock IntersectionObserver (often needed for scroll-based components)
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock ResizeObserver (often needed for responsive components)
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock window.matchMedia (for responsive design testing)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});


// Common test utilities - available globally
declare global {
  namespace Vi {
    interface JestAssertion<T = unknown> {
      toBeInTheDocument(): T;
      toHaveClass(className: string): T;
      toHaveStyle(style: Record<string, string | number>): T;
    }
  }
}
