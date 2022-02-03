import axios from "axios";
import { log } from "#serv";

export const get_activities = async () => {
  const res = await axios.get("/api/activities/");
  const activities = res.data;
  return activities;
};

export const get_activity = async (activity_id) => {
  const res = await axios.get(`/api/activities/${activity_id}`);
  const activity = res.data[0];

  return activity;
};

export const submit_activity = async ({
  title,
  type,
  author,
  createDate,
  description,
  startDate,
  endDate,
  currentState,
  authString,
  token,
}) => {
  const payload = {
    title,
    type,
    author,
    createDate,
    description,
    startDate,
    endDate,
    currentState,
    authString,
  };
  const res = await axios.post("/api/activities/", payload, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  const activityRes = res.data;
  return activityRes;
};
