import { useParams } from "react-router-dom";

function Problem(props) {
  const { problemid } = useParams();

  return (
    <main>
      <h1>{problemid}</h1>
    </main>
  );
}

export default Problem;
