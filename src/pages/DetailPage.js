import React, { useEffect } from "react";
import { ActivityDetailPage } from "./ActivityDetailPage";
import { ChapterDetailPage } from "./ChapterDetailPage";

import { Routes, Route, useLocation } from "react-router-dom";
import { Card } from "#comp/common";

export const DetailPage = () => {
  return (
    <Card.Frame
      className="hover:shadow-none hover:bg-background-50 h-fit min-h-detailCard flex flex-col justify-between gap-3 gap-y-10"
      expended="true"
    >
      <Routes>
        <Route path=":activity_id" element={<ActivityDetailPage />} />
        <Route
          path=":activity_id/chapter/:chapter_id"
          element={
            <>
              <ChapterDetailPage />
            </>
          }
        />
      </Routes>
    </Card.Frame>
  );
};

export default DetailPage;
