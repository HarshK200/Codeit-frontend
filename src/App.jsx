import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Problemset from "./pages/Problemset";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problemset" element={<Problemset />} />
      </Routes>
    </>
  );
}

export default App;
