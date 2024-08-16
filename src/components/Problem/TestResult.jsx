import { useState, useEffect } from "react";

export default function TestResult({ submissionResult }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (submissionResult) {
      setLoading(false);
      console.log(JSON.parse(submissionResult.testCasesResult));
    }
  }, [submissionResult]);

  return (
    <div className="text-sm mx-5 my-4">
      {!loading ? (
        <div>
          <div>
            <span>Submission status: </span>
            {submissionResult.SubmissionStat}
          </div>
          <div>
            <span></span>
          </div>
        </div>
      ) : (
        <h1>Run your code to see the result</h1>
      )}
    </div>
  );
}
