import http from "./httpService";

export const getExplorers = () => {
  return http.get("/explorers");
};

export const createExplorer = (explorer) => {
  return http.post("/explorers", explorer);
};
