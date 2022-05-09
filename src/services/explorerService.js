import http from "./httpService";

export const getExplorers = () => {
  return http.get("/explorers");
};
