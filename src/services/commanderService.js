import http from "./httpService";

export const getCommanders = () => {
  return http.get("/commanders");
};

export const createCommander = (commander) => {
  return http.post("/commanders", commander);
};
