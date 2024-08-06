function Example({ example, exampleNo }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold">Example {exampleNo}</h1>
      <div>
        <div className="flex gap-2">
          <span className="font-bold">Input:</span>
          <div className="flex text-example-text">
            <span>nums = [</span>
            <ul className="flex">
              {example?.input?.map((n, index) =>
                index < example?.input?.length - 1 ? (
                  <li key={index}>{n},</li>
                ) : (
                  <li key={index}>{n}</li>
                ),
              )}
            </ul>
            <span>]</span>
            {example.target ? <span>, target = {example.target}</span> : ""}
          </div>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Output:</span>
          <div className="flex text-example-text">
            <span>[</span>
            <ul className="flex">
              {example?.output?.map((n, index) =>
                index < example?.output?.length - 1 ? (
                  <li key={index}>{n},</li>
                ) : (
                  <li key={index}>{n}</li>
                ),
              )}
            </ul>
            <span>]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;
