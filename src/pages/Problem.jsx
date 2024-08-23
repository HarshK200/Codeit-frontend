import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import axios from "axios";
import Examples from "@/components/Problem/Examples";
import { toast } from "react-toastify";
import TestCasesAndResult from "@/components/Problem/TestCasesAndResult";
import Dropdown from "@/ui/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProblemPageNav from "@/components/Navbar/ProblemPageNav";
import { getExtension } from "./CreateProblem";

function Problem() {
  const { problemid } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState();
  const navigate = useNavigate();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [language, setLanguage] = useState("loading");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [focusedTab, setFocusedTab] = useState("testcase");
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
        setLanguage(res.data.problem.langSupport[0]);
      } catch (err) {
        console.log(err);
        navigate("/404");
      }
    }
    fetchProblem();
  }, []);

  useEffect(() => {
    if (problem && language !== "loading") {
      setCode(problem.StarterCode[language]);
    }
  }, [problem, language]);

  useEffect(() => {
    if (problem) {
      setLoading(false);
    }
  }, [problem]);

  function isMalicious(codeToTest) {
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
      setSubmissionLoading(true);
      const result = await axios.post(
        import.meta.env.VITE_API_URL + "/problemset/" + problemid + "/submit",
        { answer: code, language: language },
        {
          headers: {
            authorization_token: "bearer " + localStorage.getItem("auth_token"),
          },
        },
      );
      // console.log(result);
      // toast.success("status: " + result.status + " " + result.data.message);

      // Doing short polling i.e. pinging server to get code execution result when finished
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
        // console.log(response.data);
        if (response.data.submissionStat !== "PENDING") {
          // ================================= Execution Result from backend =====================================
          // console.log(response.data);
          setSubmissionResult(response.data);
          setSubmissionLoading(false);
          setFocusedTab("testresult");
          toast.info("Code Execution finished")
          clearInterval(pollIntervalId);
        }
      }, 2000);
    } catch (error) {
      setSubmissionLoading(false);
      console.log(error);
      toast.error(error.response.status + ": " + error.response.data.message);
      navigate("/signup");
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <ProblemPageNav
        onSubmit={handleSubmit}
        isSubmissionLoading={submissionLoading}
      />
      <Split
        className="split font-mono overflow-hidden"
        minSize={400}
        sizes={[50, 50]}
        gutterSize={5}
      >
        <div id="split-0" className="h-screen">
          <nav className="bg-case-bg-code px-3.5 py-1.5 text-sm flex items-center gap-2 rounded-t-lg">
            <button
              onClick={() => {
                navigate("/problemset");
              }}
              className="hover:cursor-pointer flex gap-2 justify-center items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Go Back</span>
            </button>
          </nav>
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
          className="overflow-hidden"
          direction="vertical"
          sizes={[60, 40]}
          minSize={30}
          gutterSize={5}
        >
          {/* Code Mirror Div*/}
          <div id="split-1" className="bg-code-bg flex flex-col">
            <nav className="bg-case-bg-code px-3.5 py-1.5 text-sm flex items-center gap-2 rounded-t-lg">
              {!loading ? (
                <Dropdown
                  options={problem.langSupport}
                  language={language}
                  setLanguage={setLanguage}
                />
              ) : (
                "loading"
              )}
            </nav>
            <div className="flex flex-col grow overflow-y-scroll">
              <CodeMirror
                value={!loading ? code : ""}
                className="grow"
                onChange={handleCodeChange}
                extensions={getExtension(language)}
                theme={vscodeDark}
                indentWithTab={true}
              />
            </div>
          </div>

          <div id="split-2" className="bg-problem-page-bg z-40 overflow-y-scroll">
            <TestCasesAndResult
              testcases={problem?.testCases}
              submissionResult={submissionResult}
              focusedTab={focusedTab}
              setFocusedTab={setFocusedTab}
            />
          </div>
        </Split>
      </Split>
    </div>
  );
}

export default Problem;
