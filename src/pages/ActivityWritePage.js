import React, { useEffect } from "react";
import { ActivityForm } from "#comp/write";
import { Card } from "#comp/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeActivityInput } from "@/redux/inputs";
import { createActivity } from "@/redux/submits";
import { getContainedActivities } from "@/redux/activities";
import { SubmitButton } from "#comp/common";
import { ActivityRowItem, ContainedActivities } from "#comp/activities/";
import { UserBox } from "#comp/auth/UserBox";

export const ActivityWritePage = () => {
  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch(changeActivityInput(e.target));
  };
  const onSubmit = () => {
    const now = new Date();
    const createDate =
      now.getFullYear() +
      "-" +
      `${now.getMonth() + 1}`.padStart(2, "0") +
      "-" +
      `${now.getDate()}`.padStart(2, "0");
    dispatch(
      changeActivityInput({
        name: "createDate",
        value: createDate,
      })
    );

    dispatch(createActivity());
  };
  const { data: containedActivities } = useSelector(
    (state) => state.activities.containedActivities || { data: null }
  );

  const activityInput = useSelector((state) => state.inputs.activityInput);
  const navigate = useNavigate();
  const {
    loading: userLoading,
    user,
    profile,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !window.localStorage.getItem("googleToken")) {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user) {
      dispatch(getContainedActivities());
    }
  }, [dispatch, user]);

  return (
    <div
      className="grid gap-2 mt-2"
      style={{ gridTemplateColumns: "1fr minmax(300px, 100%)" }}
    >
      <ActivityRowItem gridPosition="start_all">
        <div className="flex flex-col gap-2 ">
          <UserBox profile={profile} />
          {user && containedActivities && (
            <ContainedActivities activities={containedActivities} user={user} />
          )}
        </div>
      </ActivityRowItem>
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none min-h-detailCard"
      >
        {!user && userLoading && <span>로딩 중..</span>}
        {user && (
          <>
            <span className="text-text-500 text-xs font-bold ">
              Write | Activity
            </span>
            <ActivityForm
              onChange={onChange}
              activityInput={activityInput}
              onSubmit={onSubmit}
            />
            <div className="text-right">
              <SubmitButton onClick={onSubmit} />
            </div>
          </>
        )}
      </Card.Frame>
    </div>
  );
};

export default ActivityWritePage;
