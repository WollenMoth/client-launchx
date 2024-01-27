import { CreateExplorer, UpdateExplorer } from '../types/explorer';
import http from './httpService';

export const getExplorers = () => {
  return http.get('/explorers');
};

export const getExplorer = (id: number) => {
  return http.get(`/explorers/${id}`);
};

export const createExplorer = (explorer: CreateExplorer) => {
  return http.post('/explorers', explorer);
};

export const updateExplorer = (explorer: UpdateExplorer) => {
  return http.put(`/explorers/${explorer.id}`, explorer);
};

export const deleteExplorer = (id: number) => {
  return http.delete(`/explorers/${id}`);
};
