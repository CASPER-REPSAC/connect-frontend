import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  ActivityListGroupPage,
  ActivityDetailPage,
  ActivityWritePage,
  ChapterDetailPage,
  ChapterWritePage,
  SearchPage,
  UserPage,
  // AuthPage,
  // IssuesPage,
  // SettingsPage, 이 셋은 모달이랑 새창 열기로 처리
} from "@/pages";
import { SideBar } from "#comp/navigations";

function App() {
  const location = useLocation();
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
            <Route path="" element={<ActivityListGroupPage />} />
            <Route path="user" element={<UserPage />} />
            {/* `/api/activities/${activityId}/` */}
            <Route path="activities">
              <Route path="write">
                <Route path="" element={<ActivityWritePage />} />
                <Route path=":activity_id" element={<ChapterWritePage />} />
              </Route>
              <Route path=":activity_id">
                <Route path="" element={<ActivityDetailPage />} />
                <Route
                  path="chapar/:chapter_id"
                  element={<ChapterDetailPage />}
                />
              </Route>
            </Route>
            <Route path="search/*">
              <Route path=":type/:keyword" element={<SearchPage />} />
              <Route path="*" element={<SearchPage />} />
            </Route>
            <Route path="*" element={<ActivityListGroupPage />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
