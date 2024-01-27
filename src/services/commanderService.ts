import { CreateCommander, UpdateCommander } from '../types/commander';
import http from './httpService';

export const getCommanders = () => {
  return http.get('/commanders');
};

export const getCommander = (id: number) => {
  return http.get(`/commanders/${id}`);
};

export const createCommander = (commander: CreateCommander) => {
  return http.post('/commanders', commander);
};

export const updateCommander = (commander: UpdateCommander) => {
  return http.put(`/commanders/${commander.id}`, commander);
};

export const deleteCommander = (id: number) => {
  return http.delete(`/commanders/${id}`);
};
