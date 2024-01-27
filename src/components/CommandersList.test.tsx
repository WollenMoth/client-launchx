import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import http from '../services/httpService';
import { Commander } from '../types/commander';
import CommandersList from './CommandersList';

jest.mock('../services/httpService');

const mock = http as jest.Mocked<typeof http>;

const commanders: Commander[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    mainStack: 'React',
    currentEnrollment: true,
    hasAzureCertification: true,
  },
];

describe('Unit Tests for CommandersList', () => {
  test('renders commanders list', async () => {
    mock.get.mockResolvedValueOnce({ data: commanders });

    const { container } = render(
      <BrowserRouter>
        <CommandersList />
      </BrowserRouter>
    );

    await waitFor(() => {
      const list = container.querySelector('.list-group');
      expect(list).toBeInTheDocument();
    });
  });

  test('renders select message on initial render', async () => {
    mock.get.mockResolvedValueOnce({ data: commanders });

    render(
      <BrowserRouter>
        <CommandersList />
      </BrowserRouter>
    );

    const message = await screen.findByText(/Selecciona un commander/i);
    expect(message).toBeInTheDocument();
  });
});
