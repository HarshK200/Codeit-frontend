import { Link } from "react-router-dom";

export default function ProblemsTable({ problems }) {
  return (
    <div className="flex flex-col">
      <div className="flex pb-2 mb-2 border-b-1 border-b-navbar-boder">
        <span className="w-20 px-10">Id</span>
        <span className="w-80">Title</span>
        <span className="w-40">Difficulty</span>
        <span>Acceptance</span>
      </div>
      <div>
        {problems.map((x) => {
          return <ProblemItem key={x.id} problem={x} />;
        })}
      </div>
    </div>
  );
}

function ProblemItem({ problem }) {
  return (
    <div className="flex py-1">
      <span className="w-10 px-10">{problem.id}</span>
      <span className="w-80">
        <Link
          to={"/problemset/" + problem.id}
          className="hover:text-hover-blue"
        >
          {problem.title}
        </Link>
      </span>
      <span
        className={
          problem.difficulty === "EASY" ? "w-40 text-easy-green" : "w-40"
        }
      >
        {problem.difficulty}
      </span>
      <span>{problem.AcceptanceRate}</span>
    </div>
  );
}
