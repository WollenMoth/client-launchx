import http from "./httpService";

export const getExplorers = () => {
  return http.get("/explorers");
};

export const getExplorer = (id) => {
  return http.get(`/explorers/${id}`);
}

export const createExplorer = (explorer) => {
  return http.post("/explorers", explorer);
};

export const updateExplorer = (explorer) => {
  return http.put(`/explorers/${explorer.id}`, explorer);
};
