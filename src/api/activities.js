import axios from "axios";

export const getActivities = async () => {
  const res = axios.get("/api/activities/");
  const activities = res.data;
  return activities;
};
