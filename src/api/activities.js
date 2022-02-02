import axios from "axios";
import { log } from "#serv";

export const getActivities = async () => {
  const res = await axios.get("/api/activities/");
  const activities = res.data;
  return activities;
};

export const getActivity = async (activity_id) => {
  const res = await axios.get(`/api/activities/${activity_id}`);
  const activity = res.data[0];

  return activity;
};
