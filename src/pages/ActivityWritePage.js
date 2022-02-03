import React, { useEffect } from "react";
import { ActivityForm } from "#comp/write";
import { Card } from "#comp/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeActivityInput } from "@/redux/inputs";
import { submitActivity } from "@/redux/submits";
import { SubmitButton } from "#comp/common";

export const ActivityWritePage = () => {
  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch(changeActivityInput(e.target));
  };
  const onSubmit = () => {
    dispatch(
      changeActivityInput({
        name: "createDate",
        value: new Date()
          .toLocaleDateString()
          .split(". ")
          .join("-")
          .split(".")[0],
      })
    );

    dispatch(submitActivity());
  };

  const activityInput = useSelector((state) => state.inputs.activityInput);
  const navigate = useNavigate();
  const { loading: userLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !window.localStorage.getItem("googleToken")) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div
      className="grid gap-2 mt-2"
      style={{ gridTemplateColumns: "1fr minmax(300px, 100%)" }}
    >
      <div>1</div>
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
