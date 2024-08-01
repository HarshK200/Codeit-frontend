import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

function Problem(props) {
  const { problemid } = useParams();
  const [problem, setProblem] = useState({
    id: "foo",
    title: "test",
    description: "",
  });
  const [code, setCode] = useState("//Write your code here\n() => {\n\n}");
  const navigate = useNavigate();

  const onChange = useCallback((val, viewUpdate) => {
    setCode(val);
  }, []);

  useEffect(() => {
    async function fetchProblem() {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/problemset/" + problemid,
        {
          method: "GET",
        },
      );

      if (res.status == 404) {
        navigate("/404");
      }

      const json = await res.json();
      setProblem(json.problem);
    }

    fetchProblem();
  }, []);

  function isMalicious(codeToTest) {
    const patterns = [
      /open\s*\(.*\)/i,
      /read\s*\(.*\)/i,
      /write\s*\(.*\)/i,
      /os\.\w+/i,
      /socket\s*\(.*\)/i,
      /requests\.\w+/i,
      /urllib\.\w+/i,
      /subprocess\.\w+/i,
      /os\.system\s*\(.*\)/i,
      /exec\s*\(.*\)/i,
      /import\s+(os|sys|subprocess|shlex|ctypes)/i,
    ];
    for (let x = 0; x < patterns.length; x++) {
      if (patterns[x].test(codeToTest)) {
        return true;
      }
    }
    return false;
  }

  function handleSubmit() {
    if (isMalicious(code)) {
      console.log("STOP YOU SUSY BASTARD!");
      return;
    }
    // TODO: SEND CODE TO BACKEND VIA /SUBMIT ROUTE
  }

  return (
    <Split className="split" minSize={0}>
      <div id="split-0" className="h-screen">
        <div className="m-4 flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold">
            {/*problem.id}. {problem.title*/}
          </h1>
        </div>

        <div className="mx-4 flex flex-col gap-0.5">
          <p>Description:</p>
          <p>{/*problem.description*/}</p>
        </div>

        <div className="mx-4 mt-6 flex flex-col gap-0.5">
          <p className="font-bold">Examples:</p>
          <div>
            <span className="font-bold">Input: </span>
            <span>nums =</span>
            <ul></ul>
          </div>
          <div>
            <span className="font-bold">Output:</span>
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
