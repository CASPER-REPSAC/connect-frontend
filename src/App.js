import "./App.css";
import { Routes, Route } from "react-router-dom";
import ActivityGroupPage from "@/pages/ActivityGroupPage";
import { SideBar } from "#comp/navigations";

function App() {
  return (
    <div className="bg-background-300 w-full overflow-x-hidden h-fit min-h-full p-5 flex ">
      <div className="bg-background-100 w-full rounded-xl overflow-hidden grid grid-flow-col justify-start">
        <header className="col-start-1 bg-background-200 w-fit min-h-full">
          <SideBar />
        </header>
        <section className="col-start-2 min-w-full">
          <Routes>
            <Route path="/" element={<ActivityGroupPage />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
