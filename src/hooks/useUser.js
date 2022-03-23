// api, redux codes are in search*
// saparate user hooks for more comfortability
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSearchResult, GET_USER_SEARCH_RESULT } from "@/redux/search";
import { useParams } from "react-router-dom";

export const useUser = () => {
  const dispatch = useDispatch();
  const { user_email } = useParams();

  const {
    searched_objects: userActivities,
    searched_objects_count: activityCount,
    page_size: pageSize,
    page_index: currentPage,
    user_info,
  } = useSelector(
    (state) =>
      state.search.userSearchResult || {
        searched_objects: [],
        searched_objects_count: 0,
        page_size: 10,
        page_index: 1,
      }
  );
  const wai = useSelector((state) => state.auth.accessToken);

  const userSearchLoading = useSelector(
    (state) => state.loadings[GET_USER_SEARCH_RESULT]
  );

  const getUserInfo = (user_email) => {
    dispatch(getUserSearchResult(user_email));
  };

  useEffect(() => {
    if (wai) {
      dispatch(getUserSearchResult(user_email));
    }
  }, [user_email, dispatch, wai]);

  return {
    getUserInfo,
    userActivities,
    user_email,
    activityCount,
    pageSize,
    currentPage,
    userSearchLoading,
    user_info,
  };
};
