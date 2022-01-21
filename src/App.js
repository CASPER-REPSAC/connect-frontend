import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  ActivityGroupPage,
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
    <div className="bg-background-300 w-full overflow-x-hidden h-fit min-h-full p-5 flex ">
      {console.log(location)}
      <div className="bg-background-100 w-full rounded-xl overflow-hidden grid grid-flow-col justify-start">
        <header className="col-start-1 bg-background-200 w-fit min-h-full">
          <SideBar />
        </header>
        <section className="col-start-2 min-w-full">
          <Routes>
            <Route path="" element={<ActivityGroupPage />} />
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
            <Route path="*" element={<ActivityGroupPage />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
