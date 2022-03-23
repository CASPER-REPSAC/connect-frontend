import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  SearchPage,
  UserPage,
  MainPage,
  DetailPage,
  WritePage,
  UpdatePage,
  // AuthPage,
  // IssuesPage,
  // SettingsPage, 이 셋은 모달이랑 새창 열기로 처리
} from "@/pages";
import { SideBar, TopNavBar } from "#comp/navigations";
import { loginWithCookie } from "@/redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { Alerts, Loadings, Footer } from "#comp/common";
import { useClientThemes } from "@/hooks";

function App() {
  const { theme } = useClientThemes();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithCookie());
    return () => {};
  }, [dispatch]);

  return (
    <div className={theme}>
      <Loadings />
      <div className="bg-background-50 w-full h-fit min-h-full flex">
        <div
          className=" bg-background-200 w-full grid"
          style={{
            gridTemplateColumns: "64px 1fr",
            gridTemplateRows: "min-content 1fr",
          }}
        >
          <div className=" sticky top-0 left-0 col-start-2 row-start-1 z-20 drop-shadow">
            <TopNavBar />
          </div>
          <div className="row-span-2">
            <SideBar />
          </div>
          <section className="order-4 relative">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/activities/:activity_id/*"
                element={<DetailPage />}
              />
              <Route path="write/*" element={<WritePage />} />
              <Route path="update/:activity_id/*" element={<UpdatePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="search-user/:user_email" element={<UserPage />} />
            </Routes>
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
