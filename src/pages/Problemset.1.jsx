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
        <main className="overflow-hidden">
            <div className="w-screen h-screen flex flex-col pt-20 text-sm text-white bg-main-body-bg">
                {/*calander with streak*/}
                <Calender />
                <div id="problems-wrapper" className="flex flex-col lg:px-84">
                    <ProblemsTable problems={problems} />
                </div>
            </div>
        </main>
    );
}

