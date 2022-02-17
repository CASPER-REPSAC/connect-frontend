import axios from "axios";
import { log } from "#serv";

export const get_activities = async () => {
  const res = await axios.get("/api/activities/");
  const activities = res.data;
  return activities;
};

export const get_contained_activities = async () => {
  // api/user/contained_new
  const res = await axios.get("/api/user/contained_new/");
  return res.data;
};

export const get_activity = async (activity_id) => {
  const res = await axios.get(`/api/activities/${activity_id}`);
  const activity = res.data[0];

  return activity;
};

export const create_activity = async ({
  title,
  type,
  author,
  createDate,
  description,
  startDate,
  endDate,
  currentState,
  authString,
  tags,
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
    participants: [],
    tags,
  };
  const res = await axios.post("/api/activities/", payload);
  const activityRes = res.data;
  return activityRes;
};
