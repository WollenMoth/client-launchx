import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import http from '../services/httpService';
import { Explorer } from '../types/explorer';
import ExplorersList from './ExplorersList';

jest.mock('../services/httpService');

const mock = http as jest.Mocked<typeof http>;

const explorers: Explorer[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    mission: 'Explore Mars',
    azureCertification: true,
    dateCreated: new Date(),
    lastUpdated: new Date(),
  },
];

describe('Unit Tests for ExplorersList', () => {
  test('renders explorers list', async () => {
    mock.get.mockResolvedValueOnce({ data: explorers });

    const { container } = render(
      <BrowserRouter>
        <ExplorersList />
      </BrowserRouter>
    );

    await waitFor(() => {
      const list = container.querySelector('.list-group');
      expect(list).toBeInTheDocument();
    });
  });

  test('renders select message on initial render', async () => {
    mock.get.mockResolvedValueOnce({ data: explorers });

    render(
      <BrowserRouter>
        <ExplorersList />
      </BrowserRouter>
    );

    const message = await screen.findByText(/Selecciona un explorer/i);
    expect(message).toBeInTheDocument();
  });
});
