import { screen } from '@testing-library/react';
import http from '../services/httpService';
import { Explorer } from '../types/explorer';
import { renderInRoute, renderWithRouter } from '../utils/renderUtils';
import ExplorerForm from './ExplorerForm';

jest.mock('../services/httpService');

const mock = http as jest.Mocked<typeof http>;

const explorer: Explorer = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  mission: 'Explore Mars',
  azureCertification: true,
  dateCreated: new Date(),
  lastUpdated: new Date(),
};

describe('Unit Tests for ExplorerForm', () => {
  test('renders form', () => {
    renderWithRouter(ExplorerForm);

    const name = screen.getByRole('textbox', { name: /Nombre/i });
    const username = screen.getByRole('textbox', { name: /Username/i });
    const mission = screen.getByRole('textbox', { name: /Mission/i });
    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(mission).toBeInTheDocument();
  });

  test('fields are enabled if id is new', () => {
    renderInRoute(ExplorerForm, '/explorers/:id', '/explorers/new');

    const name = screen.getByRole('textbox', { name: /Nombre/i });
    const username = screen.getByRole('textbox', { name: /Username/i });
    const mission = screen.getByRole('textbox', { name: /Mission/i });
    expect(name).toBeEnabled();
    expect(username).toBeEnabled();
    expect(mission).toBeEnabled();
  });

  test('renders add button if id is new', () => {
    renderInRoute(ExplorerForm, '/explorers/:id', '/explorers/new');

    const addButton = screen.getByRole('button', { name: /Agregar/i });
    expect(addButton).toBeInTheDocument();
  });

  test('fields are disabled if editing an explorer', async () => {
    mock.get.mockResolvedValueOnce({ data: explorer });

    renderInRoute(ExplorerForm, '/explorers/:id', '/explorers/1');

    const name = await screen.findByRole('textbox', { name: /Nombre/i });
    const username = await screen.findByRole('textbox', { name: /Username/i });
    expect(name).toBeDisabled();
    expect(username).toBeDisabled();
  });

  test('renders update button if editing an explorer', async () => {
    mock.get.mockResolvedValueOnce({ data: explorer });

    renderInRoute(ExplorerForm, '/explorers/:id', '/explorers/1');

    const updateButton = await screen.findByRole('button', {
      name: /Actualizar/i,
    });
    expect(updateButton).toBeInTheDocument();
  });

  test('renders delete button if editing an explorer', async () => {
    mock.get.mockResolvedValueOnce({ data: explorer });

    renderInRoute(ExplorerForm, '/explorers/:id', '/explorers/1');

    const deleteButton = await screen.findByRole('button', {
      name: /Eliminar/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });
});
