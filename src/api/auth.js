import axios from "axios";
import { log } from "#serv";

export const server_login = async (accessToken) => {
  const res = await axios.post("/accounts/tokentest/", {
    access_token: accessToken,
  });
  const loginRes = res.data;
  return loginRes;
};
