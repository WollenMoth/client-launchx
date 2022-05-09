import http from "./httpService";

export const getCommanders = () => {
  return http.get("/commanders");
};

export const getCommander = (id) => {
  return http.get(`/commanders/${id}`);
};

export const createCommander = (commander) => {
  return http.post("/commanders", commander);
};

export const updateCommander = (commander) => {
  return http.put(`/commanders/${commander.id}`, commander);
};

export const deleteCommander = (id) => {
  return http.delete(`/commanders/${id}`);
};
