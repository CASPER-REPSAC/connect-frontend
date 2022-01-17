import axios from "axios";
import { log } from "#serv";

export const getActivities = async () => {
  const res = await axios.get("/api/activities/");
  const activities = res.data;
  log("getActivities returning:", activities);
  return activities;
};
