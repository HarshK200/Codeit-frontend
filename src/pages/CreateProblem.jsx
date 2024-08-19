import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";

export default function CreateProblem() {
  const [problem, setProblem] = useState();

  useEffect(() => {
    setProblem();
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <input type="text" placeholder="Enter new problem" />
      </main>
    </div>
  );
}
