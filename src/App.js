import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  // ActivityListGroupPage,
  // ActivityDetailPage,
  ActivityWritePage,
  ActivityUpdatePage,
  // ChapterDetailPage,
  ChapterWritePage,
  SearchPage,
  UserPage,
  MainPage,
  // AuthPage,
  // IssuesPage,
  // SettingsPage, 이 셋은 모달이랑 새창 열기로 처리
} from "@/pages";
import { SideBar } from "#comp/navigations";
import { loginWithCookie } from "@/redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { Alerts } from "#comp/common";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithCookie());
    return () => {};
  }, [dispatch]);

  return (
    <div className="bg-background-400 w-full h-fit min-h-full max-w-screen flex ">
      {console.log(location)}
      <div
        className="bg-background-200 w-full max-w-full grid justify-start "
        style={{ gridTemplateColumns: "64px 1fr" }}
      >
        <header className="w-fit fixed top-0 left-0 z-50 ">
          <SideBar />
        </header>
        <div className="col-start-1"></div>
        <section className="col-start-2 min-w-full max-w-full p-3 pt-1">
          <Routes>
            <Route path="user" element={<UserPage />} />
            {/* `/api/activities/${activityId}/` */}
            <Route path="write/activities">
              <Route path="" element={<ActivityWritePage />} />

              <Route path=":activity_id" element={<ChapterWritePage />} />
            </Route>
            <Route path="search/*">
              <Route path=":type/:keyword" element={<SearchPage />} />
              <Route path="*" element={<SearchPage />} />
            </Route>
            <Route path="*" element={<MainPage />} />
            <Route
              path="/update/:activity_id"
              element={<ActivityUpdatePage />}
            />
          </Routes>
        </section>
      </div>
      <Alerts />
    </div>
  );
}

export default App;
