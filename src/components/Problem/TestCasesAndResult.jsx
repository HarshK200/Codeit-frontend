import { useEffect, useState } from "react";

export default function TestCasesAndResult({testcases}) {
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if(testcases) {
      setLoading(false);
    }
  }, [testcases])


  return <div>
    <nav>
      <button>Testcase</button>
      <button>Test Result</button>
    </nav>
    <main>
    </main>
  </div>
}
