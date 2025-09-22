import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the heading', () => {
    render(<App />);
    expect(screen.getByText(/BM-VA Locations/i)).toBeInTheDocument();
  });

  it('shows fleet overview stats', () => {
    render(<App />);
    expect(screen.getByText(/Total vehicles:/i)).toBeInTheDocument();
  });
});