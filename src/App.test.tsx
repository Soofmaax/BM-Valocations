import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the landing hero', () => {
    render(<App />);
    expect(screen.getByText(/Votre citadine idéale/i)).toBeInTheDocument();
  });

  it('renders cars section heading', () => {
    render(<App />);
    expect(screen.getByText(/Nos citadines disponibles/i)).toBeInTheDocument();
  });
});