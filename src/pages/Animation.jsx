import React, { useEffect, useRef, useState } from "react";
import './Animation.css'
export default function App() {
  
  const fieldWidth = 650;
  const fieldHeight = 400;
  const ballDiameter = 100;

  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;

  
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const vx = useRef(5);
  const vy = useRef(5);
  const goRight = useRef(true);
  const goDown = useRef(true);

  
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState("none"); 

  
  const [ballBackground, setBallBackground] = useState({
    backgroundColor: "lightblue",
    backgroundImage: "",
  });

  
  const intervalRef = useRef(null);

  
  const runClicked = () => {
    setRunning((r) => !r);
  };

 
  const noneClicked = () => {
    setSelected("none");
    setBallBackground({ backgroundColor: "lightblue", backgroundImage: "" });
  };

  
  const ballClicked = (name) => {
    const cur = name.toLowerCase();
    setSelected(cur);
    setBallBackground({ backgroundColor: "transparent", backgroundImage: `url(./images/${cur}.png)` });
  };

  
  const step = () => {
    setX((prevX) => {
      let nextX = prevX;
      if (goRight.current) {
        nextX = prevX + vx.current;
        if (nextX >= maxX) {
          goRight.current = false;
        }
      } else {
        nextX = prevX - vx.current;
        if (nextX <= 0) {
          goRight.current = true;
        }
      }
      
      if (nextX < 0) nextX = 0;
      if (nextX > maxX) nextX = maxX;
      return nextX;
    });

    setY((prevY) => {
      let nextY = prevY;
      if (goDown.current) {
        nextY = prevY + vy.current;
        if (nextY >= maxY) {
          goDown.current = false;
        }
      } else {
        nextY = prevY - vy.current;
        if (nextY <= 0) {
          goDown.current = true;
        }
      }
      if (nextY < 0) nextY = 0;
      if (nextY > maxY) nextY = maxY;
      return nextY;
    });
  };

  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (running) {
        step();
      }
    }, 25); 

    return () => clearInterval(intervalRef.current);
  }, [running]);

  
  const fieldStyle = {
    width: `${fieldWidth}px`,
    height: `${fieldHeight}px`,
  };

  const ballStyle = {
    width: `${ballDiameter}px`,
    height: `${ballDiameter}px`,
    left: `${x}px`,
    top: `${y}px`,
    backgroundColor: ballBackground.backgroundColor,
    backgroundImage: ballBackground.backgroundImage,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    position: "relative",
  };

  return (
    <div className="anim-container">
      <div id="field" className="anim-field" style={fieldStyle}>
        <div id="ball" className="anim-ball" style={ballStyle} />
      </div>

      <div className="anim-control d-flex justify-content-between">
        <button
          id="run"
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={runClicked}
        >
          <i className={`bi ${running ? "bi-pause" : "bi-play"}`} />&nbsp;{running ? "PAUSE" : "RUN"}
        </button>

        <div>
          <button
            id="none"
            className={selected === "none" ? "btn btn-secondary" : "btn btn-outline-secondary"}
            onClick={noneClicked}
          >
            None
          </button>

          {[
            "Basketball",
            "Football",
            "Volleyball",
            "Human",
            "Cartoon",
          ].map((label) => (
            <button
              key={label}
              className={selected === label.toLowerCase() ? "btn btn-primary" : "btn btn-outline-primary"}
              onClick={() => ballClicked(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: 30, paddingTop: "1.5rem", paddingLeft: "10rem", fontFamily: `"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif` }}>
          
        </h1>
      </div>
    </div>
  );
}
