import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Accessibility behaviors', () => {
  it('Skip link moves focus to main content', () => {
    render(<App />);

    const skipLink = screen.getByRole('link', { name: /skip to content/i });
    fireEvent.click(skipLink);

    const main = screen.getByRole('main');
    expect(main).toHaveFocus();
  });
});