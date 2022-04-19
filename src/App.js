import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Search,
  User,
  Main,
  Detail,
  Write,
  Update,
  EndedActivities,
  // Auth,
  // Issues,
  // Settings, 이 셋은 모달이랑 새창 열기로 처리
} from "@/pages";
import { SideBar, TopNavBar } from "#comp/navigations";
import { loginWithCookie } from "@/redux/auth";
import { useDispatch } from "react-redux";
import { Loadings, Footer } from "#comp/common";
import { useClientThemes } from "@/hooks";

function App() {
  const { theme, pointColor } = useClientThemes();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithCookie());
    return () => {};
  }, [dispatch]);

  return (
    <div className={`${theme} ${pointColor}`}>
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
              <Route path="/" element={<Main />} />
              <Route path="/activities/ended" element={<EndedActivities />} />
              <Route path="/activities/:activity_id/*" element={<Detail />} />
              <Route path="write/*" element={<Write />} />
              <Route path="update/:activity_id/*" element={<Update />} />
              <Route path="search" element={<Search />} />
              <Route path="search-user/:user_email" element={<User />} />
            </Routes>
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
