import "./App.css";
import { Routes, Route } from "react-router-dom";
import ActivityListPage from "@/pages/ActivityListPage";

function App() {
  return (
    <div className="bg-background-200 w-screen h-screen">
      <Routes>
        <Route path="/" element={<ActivityListPage />} />
      </Routes>
    </div>
  );
}

export default App;
