export default function ProblemsTable({ problems }) {
  return (
    <table className="table-auto text-center">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Difficulty</th>
          <th>AcceptanceRate</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((x) => {
          return <ProblemTR key={x.id} problem={x} />;
        })}
      </tbody>
    </table>
  );
}

function ProblemTR({ problem }) {
  return (
    <tr>
      <td>{problem.id}</td>
      <td>{problem.title}</td>
      <td className={problem.difficulty === "EASY" ? "text-green-500" : ""}>
        {problem.difficulty}
      </td>
      <td>{problem.AcceptanceRate}</td>
    </tr>
  );
}
