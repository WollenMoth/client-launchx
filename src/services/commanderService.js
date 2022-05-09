import http from "./httpService";

export const getCommanders = () => {
  return http.get("/commanders");
};
