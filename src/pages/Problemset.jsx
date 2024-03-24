import { useState, useEffect } from "react";
import ProblemsTable from "../components/ProblemsTable/ProblemsTable";

export default function Problemset() {
  const [problems, setproblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await fetch("http://localhost:3000/problemset", {
        method: "GET",
      });
      const json = await res.json();
      setproblems(json.problems);
    };

    fetchProblems();
  }, []);

  return (
    <main className="flex flex-col justify-center pt-20 text-xl">
      <h1>Problems</h1>
      <ProblemsTable problems={problems} />
    </main>
  );
}
