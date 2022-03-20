import React from "react";
import { Routes, Route } from "react-router-dom";
import { Card, Guides } from "#comp/common";
import { FormContainer } from "#comp/write";
import { useSelector } from "react-redux";

const WritePage = () => {
  const { loading: authLoading, user } = useSelector((state) => state.auth);

  return (
    <div className="p-2 h-full w-full flex justify-center">
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none w-full sm:w-[500px] md:w-[650px] lg:w-[900px]"
      >
        {!authLoading && user && (
          <Routes>
            <Route path="" element={<FormContainer.WriteActivity />} />
            <Route
              path=":activity_id/"
              element={<FormContainer.WriteChapter />}
            />
          </Routes>
        )}
        {authLoading && <Guides.Loading />}
        {!user && !authLoading && <Guides.Login />}
      </Card.Frame>
    </div>
  );
};

export default WritePage;
