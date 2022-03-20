import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivities,
  // getContainedActivities,
  getAllActivities,
  GET_ACTIVITIES,
} from "@/redux/activities";
import {
  sortActivitiesByType,
  sortActivitiesById,
  filterActivitiesByCurrentState,
} from "#serv";
import { useLayouts } from "./useLayouts";

export const useGetActivities = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActivities());
    dispatch(getAllActivities());
  }, [dispatch]);
};

export const useActivities = () => {
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

export const useActivityGroup = (activities, title) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { mainLayout } = useLayouts();

  let pageSize = 6;
  console.log(title, mainLayout.fourth);
  if (title === mainLayout.fourth || title === mainLayout.fifth) {
    pageSize = 3;
  }
  const maxPage = Math.ceil(activities.length / pageSize);

  useEffect(() => {
    if (maxPage > 0 && currentPage >= maxPage) {
      setCurrentPage(maxPage - 1);
    }
  }, [currentPage, maxPage]);

  useEffect(() => {
    if (currentPage < 0) {
      setCurrentPage(0);
    }
  }, [currentPage]);

  const onNextPage = () => {
    if (activities.length > (currentPage + 1) * pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };
  const onPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return { maxPage, currentPage, pageSize, onNextPage, onPreviousPage };
};
