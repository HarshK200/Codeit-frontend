import { useState, useEffect } from "react";
import ProblemsTable from "../components/Problemset/ProblemsTable";
import Calendar from "react-calendar";
import Navbar from "../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

export default function Problemset() {
  const [problems, setproblems] = useState([]);
  const [calValue, setCalValue] = useState(new Date());

  useEffect(() => {
    async function fetchProblems() {
      const res = await fetch(import.meta.env.VITE_API_URL + "/problemset", {
        method: "GET",
      });
      const json = await res.json();
      setproblems(json.problems);
    }

    fetchProblems();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-body-bg">
      <Navbar />
      <main className="w-screen h-screen flex text-sm text-main-text-color justify-center my-12">
        <div className="flex flex-col items-center">
          <div className="w-full bg-secondary-body-bg px-8 py-2.5 my-6 rounded-lg flex justify-between items-center">
            <input placeholder="Search" className="py-0.5 px-4 rounded-sm bg-main-text-color font-bold text-black w-80 placeholder:text-black"/>
            <button className="flex justify-center items-center gap-2 font-bold">
              <FontAwesomeIcon icon={faShuffle} className="w-5 h-5"/>
              RANDOM
            </button>
          </div>
          <div id="problems-wrapper" className="">
            <ProblemsTable problems={problems} />
          </div>
        </div>

        {/*calander with streak*/}
        <div className="flex bg-secondary-body-bg lg:h-96 md:h-80 lg:w-64 md:w-52 relative lg:left-32 px-5 md:px-2 py-5 md:py-2 md:mx-0.5 md:my-0.5 rounded-md">
          <Calendar
            className="w-80 h-96"
            onChange={setCalValue}
            value={calValue}
            // used to render custom content
            //tileContent={}
            showNavigation={true}
          />
        </div>
      </main>
    </div>
  );
}
