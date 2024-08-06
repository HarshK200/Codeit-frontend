import { useState, useEffect } from "react";
import ProblemsTable from "../components/Problemset/ProblemsTable";
import Calendar from "react-calendar";


export default function Problemset() {
  const [problems, setproblems] = useState([]);
  const [calValue, setCalValue] = useState(new Date());

  useEffect(() => {
    async function fetchProblems () {
      const res = await fetch(import.meta.env.VITE_API_URL+"/problemset", {
        method: "GET",
      });
      const json = await res.json();
      setproblems(json.problems);
    };

    fetchProblems();
  }, []);

  return (
    <main className="overflow-hidden">
      <div className="w-screen h-screen flex pt-20 text-sm text-white bg-main-body-bg">
        <div id="problems-wrapper" className="flex flex-col lg:px-84">
          <ProblemsTable problems={problems} />
        </div>
        {/*calander with streak*/}
        <div className="flex">
          <Calendar
            className="w-80 h-96"
            onChange={setCalValue}
            value={calValue}
            // used to render custom content
            //tileContent={}
            showNavigation={true}
          />
        </div>
      </div>
    </main>
  );
}
