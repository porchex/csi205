import React, { useEffect, useRef, useState } from "react";
import "./Animation.css";

import basketball from "/images/basketball.png";
import cartoon from "/images/cartoon.png";
import logo from "/images/logo.png";
import football from "/images/football.png";
import human from "/images/human.png";
import volleyball from "/images/volleyball.png";
import field from "/images/field.png";

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

  const runClicked = () => setRunning((r) => !r);

  const noneClicked = () => {
    setSelected("none");
    setBallBackground({
      backgroundColor: "lightblue",
      backgroundImage: "",
    });
  };

  const images = {
    basketball,
    football,
    volleyball,
    human,
    cartoon,
  };

  const ballClicked = (name) => {
    const cur = name.toLowerCase();
    setSelected(cur);
    setBallBackground({
      backgroundColor: "transparent",
      backgroundImage: `url(${images[cur]})`,
    });
  };

  const step = () => {
    setX((prevX) => {
      let nextX = prevX + (goRight.current ? vx.current : -vx.current);
      if (nextX >= maxX || nextX <= 0) goRight.current = !goRight.current;
      return Math.min(Math.max(nextX, 0), maxX);
    });

    setY((prevY) => {
      let nextY = prevY + (goDown.current ? vy.current : -vy.current);
      if (nextY >= maxY || nextY <= 0) goDown.current = !goDown.current;
      return Math.min(Math.max(nextY, 0), maxY);
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (running) step();
    }, 25);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const fieldStyle = {
  width: `${fieldWidth}px`,
  height: `${fieldHeight}px`,
  backgroundImage: `url(${field})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  overflow: "hidden", 
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
    <div className="anim-container text-center">
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "120px",
          marginBottom: "1rem",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      />

      <div id="field" className="anim-field mx-auto" style={fieldStyle}>
        <div id="ball" className="anim-ball" style={ballStyle} />
      </div>

      
      <div className="anim-control d-flex justify-content-between mt-3">
        <button
          id="run"
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={runClicked}
        >
          <i className={`bi ${running ? "bi-pause" : "bi-play"}`} />
          &nbsp;
          {running ? "PAUSE" : "RUN"}
        </button>

        <div>
          <button
            id="none"
            className={
              selected === "none"
                ? "btn btn-secondary"
                : "btn btn-outline-secondary"
            }
            onClick={noneClicked}
          >
            None
          </button>

          {["Basketball", "Football", "Volleyball", "Human", "Cartoon"].map(
            (label) => (
              <button
                key={label}
                className={
                  selected === label.toLowerCase()
                    ? "btn btn-primary"
                    : "btn btn-outline-primary"
                }
                onClick={() => ballClicked(label)}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
