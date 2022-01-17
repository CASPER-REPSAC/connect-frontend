import "./App.css";
import { Routes, Route } from "react-router-dom";
import ActivityGroupPage from "@/pages/ActivityGroupPage";

function App() {
  return (
    <div className="bg-background-200 w-screen h-screen p-5">
      <div className="bg-background-100 w-full h-full rounded-3xl overflow-hidden">
        <Routes>
          <Route path="/" element={<ActivityGroupPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
