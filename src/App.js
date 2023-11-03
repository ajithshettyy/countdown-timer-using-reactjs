import React, { Fragment, useState, useRef } from "react";

function App() {
  const [maxMinute, setMaxMinute] = useState(0);
  const [maxSecond, setMaxSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [started, setStart] = useState(false);
  const Ref = useRef();

  const pauseAction = () => {
    if (started && Ref.current) {
      clearInterval(Ref.current);
      setStart(false);
    } else startAction();
  };

  const resetAction = () => {
    if (Ref.current) {
      clearInterval(Ref.current);
      setMinute(0);
      setSecond(0);
    }
  };

  const startAction = () => {
    setStart(true);
    let min = minute || (maxMinute < 10 ? `0${maxMinute}` : maxMinute);
    let sec = second || (maxSecond < 10 ? `0${maxSecond}` : maxSecond);
    if (sec > 60) {
      sec = sec % 60;
      min = min + 1;
    }
    setMinute(min);
    setSecond(sec);
    if (Ref.current) clearInterval(Ref.current);
    Ref.current = setInterval(function () {
      if (parseInt(min) === 0 && parseInt(sec) === 0) {
        clearInterval(Ref.current);
        return;
      }
      sec = parseInt(sec) - 1;
      if (sec === -1) {
        min = parseInt(min) - 1;
        sec = 59;
      }
      if (min < 10) min = `0${parseInt(min)}`;
      if (sec < 10) sec = `0${parseInt(sec)}`;
      setSecond(sec);
      setMinute(min);
    }, 1000);
  };

  return (
    <Fragment>
      <label>
        <input
          type="number"
          value={maxMinute}
          onChange={(e) => setMaxMinute(parseInt(e.target.value))}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={maxSecond}
          onChange={(e) => setMaxSeconds(parseInt(e.target.value))}
        />
        Seconds
      </label>

      <button onClick={startAction}>START</button>
      <button onClick={pauseAction}>PAUSE / RESUME</button>
      <button onClick={resetAction}>RESET</button>

      <h1 data-testid="running-clock">{`${minute}:${second}`}</h1>
    </Fragment>
  );
}

export default App;
