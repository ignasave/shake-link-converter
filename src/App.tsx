import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const oldlinkref = useRef<HTMLInputElement>(null);

  const convertLink = () => {
    const value = oldlinkref.current?.value;
    // the value should look like this: https://app.shakebugs.com/gasbuddy/IISZ6VHR/feedback/19587
    if (value) {
      const split = value.split("/");
      const id = split[split.length - 1];
      // check that the link has the correct shape with a regex:
      const regex =
        /https:\/\/app.shakebugs.com\/gasbuddy\/\w{8}\/feedback\/\d+/;
      if (regex.test(value)) {
        //get the project id that in this case is "IISZ6VHR"
        const project = split[split.length - 3];
        // and now we should convert it to this: https://app.shakebugs.com/gasbuddy/user-feedback/IISZ6VHR/19587
        const newLink = `https://app.shakebugs.com/gasbuddy/user-feedback/${project}/${id}`;
        setError(null);
        setResult(newLink);
      } else {
        setError("Invalid link");
      }
    } else {
      setError("Please enter a link");
    }
  };

  const copyvalue = () => {
    result
      ? navigator.clipboard.writeText(result)
      : setError("We cant copy that");
  };

  const clear = () => {
    // clear the input
    oldlinkref.current!.value = "";
    // clear the result
    setResult(null);
  };

  const open = () => {
    // open the link in a new tab
    result ? window.open(result, "_blank") : setError("We cant open that");
  };

  return (
    <div className="App">
      <div className="row">
        <label htmlFor="old">Old link: </label>
        <input id="old" type="text" ref={oldlinkref} className="textInput" />
        <button onClick={convertLink}>convert</button>
        {result && <button onClick={clear}>clear</button>}
      </div>

      {result && (
        <div className="row">
          <label htmlFor="result">Result: </label>
          <input id="result" value={result} className="textInput" />
          <button onClick={copyvalue}>copy</button>
          <button onClick={open}>open</button>
        </div>
      )}
      {error ? error : null}
    </div>
  );
}

export default App;
