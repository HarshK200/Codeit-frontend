import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Problemset from "./pages/Problemset.1";
import { Routes, Route } from "react-router-dom";
import Problem from "./components/Problem/Problem";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problemset" element={<Problemset />} />
        <Route path="/problemset/:problemid" element={<Problem />} />
      </Routes>
    </>
  );
}

export default App;
