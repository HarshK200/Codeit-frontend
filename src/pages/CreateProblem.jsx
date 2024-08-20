import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import Dropdown from "@/ui/Dropdown";
import { toast } from "react-toastify";

function getExtension(langauge) {
  switch (langauge) {
    case "javascript":
      return javascript();
      break;
    case "cpp":
      return cpp();
    case "jason":
      return json();

    default:
      return javascript();
  }
}
export default function CreateProblem() {
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    examples: "",
    testCases: "",
    difficulty: "",
    AcceptanceRate: "",
    StarterCode: { javascript: "", cpp: "" },
    langSupport: [],
    problemEvalCode: { javascript: "", cpp: "" },
  });
  const [languageStarterCode, setLanguageStarterCode] =
    useState("Select a language");
  const [languageEvalCode, setLanguageEvalCode] = useState("Select a language");

  async function handleSubmit(e) {
    e.preventDefault();
    if (problem.langSupport.length === 0) {
      toast.error(
        "Please select at least one language and provide it's starter and eval code",
      );
      return;
    }
    console.log("submitted", problem);
    const result = await axios.post(
      import.meta.env.VITE_API_URL + "/createproblem",
      problem,
    );
    console.log(result);
  }

  return (
    <div>
      <Navbar />
      <main className="flex justify-center py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required={true}
            type="text"
            placeholder="Title"
            value={problem.title}
            onChange={(e) => {
              setProblem({ ...problem, title: e.target.value });
            }}
          />

          <input
            required={true}
            type="text"
            placeholder="Description"
            value={problem.description}
            onChange={(e) => {
              setProblem({ ...problem, description: e.target.value });
            }}
          />

          {/* Code Mirror Div*/}
          <span>TestCases:</span>
          <div className="bg-code-bg">
            <CodeMirror
              value={problem.testCases}
              height="300px"
              width="800px"
              onChange={(value) => {
                setProblem({ ...problem, testCases: value });
              }}
              extensions={[json()]}
              theme={vscodeDark}
              indentWithTab={true}
            />
          </div>

          {/* Code Mirror Div*/}
          <span>Examples:</span>
          <div className="bg-code-bg">
            <CodeMirror
              value={problem.examples}
              height="300px"
              width="800px"
              onChange={(value) => {
                setProblem({ ...problem, examples: value });
              }}
              extensions={[json()]}
              theme={vscodeDark}
              indentWithTab={true}
            />
          </div>

          <SelectDifficulty problem={problem} setProblem={setProblem} />

          <input
            required={true}
            type="text"
            placeholder="AcceptanceRate"
            value={problem.AcceptanceRate}
            onChange={(e) => {
              setProblem({ ...problem, AcceptanceRate: e.target.value });
            }}
          />

          <SelectLanguage problem={problem} setProblem={setProblem} />

          {/* Code Mirror Div*/}
          <span>Starter Code:</span>
          <div className="bg-code-bg">
            <nav className="bg-case-bg-code px-3.5 py-1.5 text-sm flex items-center gap-2 rounded-t-lg">
              <Dropdown
                options={problem.langSupport}
                language={languageStarterCode}
                setLanguage={setLanguageStarterCode}
              />
            </nav>
            <CodeMirror
              value={problem.StarterCode[`${languageStarterCode}`]}
              height="300px"
              width="800px"
              onChange={(value) => {
                if (
                  languageStarterCode === null ||
                  languageStarterCode === "Select a language"
                ) {
                  toast.error("please select a language for starter code");
                  return;
                }
                const updateStarterCode = problem.StarterCode;
                updateStarterCode[`${languageStarterCode}`] = value;
                setProblem({ ...problem, StarterCode: updateStarterCode });
              }}
              extensions={getExtension(languageStarterCode)}
              theme={vscodeDark}
              indentWithTab={true}
            />
          </div>

          {/* Code Mirror Div*/}
          <span>Evalutaion Code:</span>
          <div className="bg-code-bg">
            <nav className="bg-case-bg-code px-3.5 py-1.5 text-sm flex items-center gap-2 rounded-t-lg">
              <Dropdown
                options={problem.langSupport}
                language={languageEvalCode}
                setLanguage={setLanguageEvalCode}
              />
            </nav>
            <CodeMirror
              value={problem.problemEvalCode[`${languageEvalCode}`]}
              height="300px"
              width="800px"
              onChange={(value) => {
                if (
                  languageEvalCode === null ||
                  languageEvalCode === "Select a language"
                ) {
                  toast.error("please select a language for eval code");
                  return;
                }
                const updateEvalCode = problem.problemEvalCode;
                updateEvalCode[`${languageEvalCode}`] = value;
                setProblem({ ...problem, problemEvalCode: updateEvalCode });
              }}
              extensions={getExtension(languageEvalCode)}
              theme={vscodeDark}
              indentWithTab={true}
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-case-bg-code px-2 py-1">
              Create
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function SelectDifficulty({ problem, setProblem }) {
  const difficulties = ["EASY", "MEDIUM", "HARD"];
  return (
    <fieldset>
      <span>Select Difficulty:</span>
      {difficulties.map((difficulty) => {
        return (
          <div className="flex gap-2" key={difficulty}>
            <input
              id={`${difficulty}`}
              type="radio"
              placeholder="langSupport"
              value={difficulty}
              onChange={(e) => {
                setProblem({ ...problem, difficulty: e.target.value });
              }}
              checked={problem.difficulty === difficulty}
            />
            <label htmlFor={`${difficulty}`}>{difficulty}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

function SelectLanguage({ problem, setProblem }) {
  const langSupportOptions = ["javascript", "cpp"];
  return (
    <div>
      <span>Supported languages:</span>
      {langSupportOptions.map((lang) => {
        return (
          <div className="flex gap-2" key={lang}>
            <input
              id={`${lang}`}
              type="checkbox"
              placeholder="langSupport"
              value={lang}
              onChange={(e) => {
                const langSupported = problem.langSupport;
                if (
                  e.target.checked &&
                  langSupported.findIndex((ele) => {
                    return ele === e.target.value;
                  }) == -1
                ) {
                  langSupported.push(e.target.value);
                } else if (
                  !e.target.checked &&
                  langSupported.findIndex((ele) => {
                    return ele === e.target.value;
                  }) != -1
                ) {
                  langSupported.pop(e.target.value);
                }
                setProblem({ ...problem, langSupport: langSupported });
              }}
            />
            <label htmlFor={`${lang}`}>{lang}</label>
          </div>
        );
      })}
    </div>
  );
}

export { getExtension };
