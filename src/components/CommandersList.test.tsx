import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommandersList from './CommandersList';

describe('Unit Tests for CommandersList', () => {
  test('renders commanders list', () => {
    const { container } = render(
      <BrowserRouter>
        <CommandersList />
      </BrowserRouter>
    );
    const list = container.querySelector('.list-group');
    expect(list).toBeInTheDocument();
  });

  test('renders select message on initial render', () => {
    render(
      <BrowserRouter>
        <CommandersList />
      </BrowserRouter>
    );
    expect(screen.getByText(/Selecciona un commander/i)).toBeInTheDocument();
  });
});
