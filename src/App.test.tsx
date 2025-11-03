import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the skip link and shows Suspense fallback', async () => {
    render(<App />);
    // Skip link is always present for accessibility
    expect(screen.getByRole('link', { name: /Skip to content/i })).toBeInTheDocument();
    // Suspense fallback should appear before lazy pages resolve
    expect(await screen.findByText(/Loading…/i)).toBeInTheDocument();
  });

  it('renders brand links without ambiguity', () => {
    render(<App />);
    // Brand link can appear in header or footer; assert at least one occurrence
    const brands = screen.getAllByText(/BM-VA Locations/i);
    expect(brands.length).toBeGreaterThan(0);
  });
});