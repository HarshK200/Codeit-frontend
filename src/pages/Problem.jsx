import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import axios from "axios";
import Examples from "../components/Problem/Examples";
import { toast } from "react-toastify";
import TestCasesAndResult from "../components/Problem/TestCasesAndResult";

function Problem() {
  const { problemid } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState();
  const navigate = useNavigate();
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleCodeChange = useCallback((val) => {
    setCode(val);
  }, []);

  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/problemset/" + problemid,
        );
        setProblem(res.data.problem);
        setCode(res.data.problem.StarterCode);
      } catch (err) {
        console.log(err);
        navigate("/404");
      }
    }
    fetchProblem();
  }, []);

  useEffect(() => {
    if (problem) {
      setLoading(false);
    }
  }, [problem]);

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

  async function handleSubmit() {
    if (isMalicious(code)) {
      console.log("System level function/imports are not allowed");
      return;
    }

    try {
      const result = await axios.post(
        import.meta.env.VITE_API_URL + "/problemset/" + problemid + "/submit",
        { answer: code, language: "javascript" },
        {
          headers: {
            authorization_token: "bearer " + localStorage.getItem("auth_token"),
          },
        },
      );
      // console.log(result);
      toast.success("status: " + result.status + " " + result.data.message);

      // TODO: setup short polling
      const pollIntervalId = setInterval(async () => {
        const response = await axios.post(
          import.meta.env.VITE_SERVER_POLLING_URL,
          {
            submissionId: result.data.submissionId,
          },
          {
            headers: {
              authorization_token:
                "bearer " + localStorage.getItem("auth_token"),
            },
          },
        );
        console.log(response.data);
        if (response.data.submissionStat !== "PENDING") {
          setSubmissionResult(response.data);
          clearInterval(pollIntervalId);
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.status + ": " + error.response.data.message);
    }
  }

  return (
    <Split
      className="split font-mono"
      minSize={400}
      sizes={[50, 50]}
      gutterSize={5}
    >
      <div id="split-0" className="h-screen">
        <div className="m-4 flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold">
            {!loading ? problem?.id : ""}. {!loading ? problem?.title : ""}
          </h1>
        </div>

        <div className="mx-4 flex flex-col gap-0.5">
          <p>Description:</p>
          <p>{!loading ? problem?.description : ""}</p>
        </div>

        <div className="mx-4 mt-6 flex flex-col gap-0.5">
          {!loading ? (
            <Examples examples={problem?.examples} />
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
      <Split
        className="overflow-auto"
        direction="vertical"
        sizes={[60, 40]}
        minSize={10}
        gutterSize={5}
      >
        {/* Code Mirror Div*/}
        <div id="split-1" className="bg-code-bg">
          <CodeMirror
            value={!loading ? code : ""}
            height="auto"
            onChange={handleCodeChange}
            extensions={[javascript({ javascript: true })]}
            theme={vscodeDark}
          />
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>

        <div id="split-2" className="bg-code-bg">
          <TestCasesAndResult testcases={problem?.testCases} submissionResult={submissionResult}/>
        </div>
      </Split>
    </Split>
  );
}

export default Problem;
