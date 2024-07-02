import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

function Problem(props) {
  const { problemid } = useParams();
  const [code, setCode] = useState("# write your code here");

  const onChange = useCallback((val, viewUpdate) => {
    setCode(val);
  },[]);

  return (
    <Split className="split" minSize={0}>
      <div id="split-0" className="h-screen">
        Problem no. {problemid}
      </div>
      <Split
        className="overflow-auto"
        direction="vertical"
        sizes={[60, 40]}
        minSize={0}
      >

        {/* Code Mirror Div*/}
        <div id="split-1">
          {/*problemid*/}
          <CodeMirror
            value={code}
            height="200px"
            onChange={onChange}
            extensions={[python({python: true})]}
            theme={vscodeDark}
          />
        </div>

        <div id="split-2">horizontal</div>
      </Split>
    </Split>
  );
}

export default Problem;
