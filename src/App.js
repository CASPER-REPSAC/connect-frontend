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
import { Alerts } from "#comp/common";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithCookie());
    return () => {};
  }, [dispatch]);

  return (
    <div className="bg-background-50 w-full h-fit min-h-full flex ">
      <div
        className=" bg-background-200 w-full grid"
        style={{
          gridTemplateColumns: "64px 1fr",
          gridTemplateRows: "min-content 1fr",
        }}
      >
        <div className="col-start-2 row-start-1 ">
          <TopNavBar />
        </div>
        <div className="row-span-2">
          <SideBar />
        </div>
        <section className="order-4 ">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/activities/:activity_id/*" element={<DetailPage />} />
            <Route path="write/*" element={<WritePage />} />
            <Route path="update/:activity_id/*" element={<UpdatePage />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
