import React, { useContext, useRef, useState } from "react";
import "./styles.css";
const TempContext = React.createContext("Welcome Msg");
const CountContext = React.createContext();

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <TempContext.Provider value="Hi Dev">
        <ConverTemp />
      </TempContext.Provider>
    </div>
  );
}

function ConverTemp() {
  const [ctemp, setCtemp] = useState();
  const [ftemp, setFtemp] = useState();
  const [changedTemp, setChangedTemp] = useState("");
  const [cCount, setCCount] = useState(0);
  const [fCount, setFCount] = useState(0);

  const updateCount = (tempType) => {
    if (tempType === "C") {
      setCCount(cCount + 1);
    }

    if (tempType === "F") {
      setFCount(fCount + 1);
    }
  };

  const handleConvert = (tempType, value, tempRef) => {
    if (tempType === "C") {
      const temp = toFahrenheit(value);
      setFtemp(temp);
      setCtemp(value);
      setChangedTemp("C");
    }

    if (tempType === "F") {
      const temp = toCelsius(value);
      setCtemp(temp);
      setFtemp(value);
      setChangedTemp("F");
    }
    console.log("tempRef--> ", tempRef);
    tempRef.current.style.background = "red";
    //  tempRef.current.focus();
  };

  function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  return (
    <div>
      <CountContext.Provider value={{ cCount, fCount, updateCount }}>
        <Temparature
          tempType="C"
          tempValue={ctemp}
          handleConvert={handleConvert}
          changedTemp={changedTemp}
        />

        <br />
        <Temparature
          tempType="F"
          tempValue={ftemp}
          handleConvert={handleConvert}
          changedTemp={changedTemp}
        />
      </CountContext.Provider>
    </div>
  );
}

function Temparature(props) {
  //  const [tempInput, setTempInput] = useState();

  // setTempInput(props.tempValue);

  const countContext = useContext(CountContext);
  const tempRef = useRef();

  const welcomeNote = useContext(TempContext);

  const handleConvert = (event) => {
    const { value } = event.target;
    //  setTempInput(value);
    props.handleConvert(props.tempType, value, tempRef);
    event.preventDefault();
    countContext.updateCount(props.tempType);
    return;
  };

  return (
    <div key={props.tempValue}>
      Total number of Clicks{" "}
      {props.tempType === "C" ? countContext.cCount : countContext.fCount}
      <br />
      Welcome Note from Context <b> {welcomeNote} </b>
      <br /> <br />
      <div> Enter Temparature in {props.tempType} </div> <br />
      <input
        autoFocus={props.changedTemp === props.tempType}
        style={{
          // transition-delay: 0.5s;
          //  transitionDelay: "1s",
          background: props.changedTemp !== props.tempType ? "green" : "white"
        }}
        ref={tempRef}
        value={props.tempValue}
        onChange={handleConvert}
      />
    </div>
  );
}
