import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AppErrorBoundary from './ErrorBoundary';

function Exploding(): JSX.Element {
  throw new Error('boom');
}

describe('AppErrorBoundary', () => {
  it('renders fallback UI when a child throws', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <Exploding />
      </AppErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it('fallback reload button triggers window.location.reload', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const originalLocation = window.location;
    const reloadSpy = vi.fn();

    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, reload: reloadSpy },
      configurable: true,
      writable: true,
    });

    render(
      <AppErrorBoundary>
        <Exploding />
      </AppErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /reload/i });
    fireEvent.click(reloadButton);

    expect(reloadSpy).toHaveBeenCalledTimes(1);

    // restore
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      configurable: true,
      writable: true,
    });
    errorSpy.mockRestore();
  });
});