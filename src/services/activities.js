export function sortActivitiesByType(activities, type) {
  if (!activities) {
    return [];
  }
  return activities.filter((activity) => activity.type === type);
}

export function sortActivitiesById(activities) {
  if (!activities) {
    return [];
  }
  return activities.sort((a, b) => {
    if (a.id < b.id) return 1;
    else return -1;
  });
}

export function filterActivitiesByCurrentState(activities, currentState) {
  return activities.filter(
    (activity) => activity.currentState === currentState
  );
}
