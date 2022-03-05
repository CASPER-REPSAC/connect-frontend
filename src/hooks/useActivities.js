import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivities,
  getContainedActivities,
  getAllActivities,
  GET_ACTIVITIES,
} from "@/redux/activities";
import {
  sortActivitiesByType,
  sortActivitiesById,
  filterActivitiesByCurrentState,
} from "#serv";

export const useActivities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getContainedActivities());
    dispatch(getAllActivities());
  }, [dispatch]);

  const { activities: runningActivities, allActivities } = useSelector(
    (state) => state.activities
  );
  const activitiesLoading = useSelector(
    (state) => state.loadings[GET_ACTIVITIES]
  );

  const activities = {
    running: sortActivitiesById(
      filterActivitiesByCurrentState(runningActivities, 1)
    ),
    planned: sortActivitiesById(
      filterActivitiesByCurrentState(runningActivities, 0)
    ),
    Study: sortActivitiesById(sortActivitiesByType(allActivities, "Study")),
    Project: sortActivitiesById(sortActivitiesByType(allActivities, "Project")),
    CTF: sortActivitiesById(sortActivitiesByType(allActivities, "CTF")),
  };

  return {
    activities,
    activitiesLoading,
  };
};
