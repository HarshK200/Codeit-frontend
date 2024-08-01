import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Problemset from "./pages/Problemset";
import { Routes, Route } from "react-router-dom";
import Problem from "./pages/Problem.jsx";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problemset" element={<Problemset />} />
        <Route path="/problemset/:problemid" element={<Problem />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
