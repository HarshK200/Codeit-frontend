import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

function Problem(props) {
  const { problemid } = useParams();
  const [problem, setProblem] = useState({});
  const [code, setCode] = useState("//Write your code here\n() => {\n\n}");

  const onChange = useCallback((val, viewUpdate) => {
    setCode(val);
  }, []);

  useEffect(() => {
    async function fetchProblem () {
      const res = await fetch("http://localhost:3000/problemset/" + problemid, {
        method: "GET",
      });
      const json = await res.json();
      setProblem(json.problem);
    };

    fetchProblem();
  }, []);

  function handleSubmit() {
    let result = eval(code)();
    console.log(result);
    const nums = problem.examples["0"].input.nums 
    console.log(nums)
  }

  return (
    <Split className="split" minSize={0}>
      <div id="split-0" className="h-screen">

        <div className="m-4 flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold">{problem.id}. {problem.title}</h1>
        </div>

        <div className="mx-4 flex flex-col gap-0.5">
          <p>Description:</p>
          <p>{problem.description}</p>
        </div>

        <div className="mx-4 mt-6 flex flex-col gap-0.5">
          <p className="font-bold">Examples:</p>
          <div>
            <span className="font-bold">Input: </span>
            <span>nums =</span>
            <ul></ul>
          </div>
          <div>
            <span className="font-bold">
              Output:
            </span>
          </div>
        </div>

      </div>
      <Split
        className="overflow-auto"
        direction="vertical"
        sizes={[60, 40]}
        minSize={0}
      >
        {/* Code Mirror Div*/}
        <div id="split-1">
          <CodeMirror
            value={code}
            height="200px"
            onChange={onChange}
            extensions={[javascript({ javascript: true })]}
            theme={vscodeDark}
          />
        </div>

        <div id="split-2">
          horizontal
          <button
            type="button"
            className="flex flex-col"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </Split>
    </Split>
  );
}

export default Problem;
