import { screen } from '@testing-library/react';
import http from '../services/httpService';
import { Commander } from '../types/commander';
import { renderInRoute, renderWithRouter } from '../utils/renderUtils';
import CommanderForm from './CommanderForm';

jest.mock('../services/httpService');

const mock = http as jest.Mocked<typeof http>;

const commander: Commander = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  mainStack: 'React',
  currentEnrollment: true,
  hasAzureCertification: true,
};

describe('Unit Tests for CommanderForm', () => {
  test('renders form', () => {
    renderWithRouter(CommanderForm);

    const name = screen.getByRole('textbox', { name: /Nombre/i });
    const username = screen.getByRole('textbox', { name: /Username/i });
    const mainStack = screen.getByRole('textbox', { name: /Main Stack/i });
    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(mainStack).toBeInTheDocument();
  });

  test('fields are enabled if id is new', () => {
    renderInRoute(CommanderForm, '/commanders/:id', '/commanders/new');

    const name = screen.getByRole('textbox', { name: /Nombre/i });
    const username = screen.getByRole('textbox', { name: /Username/i });
    const mainStack = screen.getByRole('textbox', { name: /Main Stack/i });
    expect(name).toBeEnabled();
    expect(username).toBeEnabled();
    expect(mainStack).toBeEnabled();
  });

  test('renders add button if id is new', () => {
    renderInRoute(CommanderForm, '/commanders/:id', '/commanders/new');

    const addButton = screen.getByRole('button', { name: /Agregar/i });
    expect(addButton).toBeInTheDocument();
  });

  test('fields are disabled if editing a commander', async () => {
    mock.get.mockResolvedValueOnce({ data: commander });

    renderInRoute(CommanderForm, '/commanders/:id', '/commanders/1');

    const name = await screen.findByRole('textbox', { name: /Nombre/i });
    const username = await screen.findByRole('textbox', { name: /Username/i });
    expect(name).toBeDisabled();
    expect(username).toBeDisabled();
  });

  test('renders update button if editing a commander', async () => {
    mock.get.mockResolvedValueOnce({ data: commander });

    renderInRoute(CommanderForm, '/commanders/:id', '/commanders/1');

    const updateButton = await screen.findByRole('button', {
      name: /Actualizar/i,
    });
    expect(updateButton).toBeInTheDocument();
  });

  test('renders delete button if editing a commander', async () => {
    mock.get.mockResolvedValueOnce({ data: commander });

    renderInRoute(CommanderForm, '/commanders/:id', '/commanders/1');

    const deleteButton = await screen.findByRole('button', {
      name: /Eliminar/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });
});
