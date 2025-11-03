import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the landing hero', async () => {
    render(<App />);
    expect(await screen.findByText(/Votre citadine idéale/i)).toBeInTheDocument();
  });

  it('renders cars section heading', async () => {
    render(<App />);
    expect(await screen.findByText(/Nos citadines disponibles/i)).toBeInTheDocument();
  });
});