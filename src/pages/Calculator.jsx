import { useState, useEffect } from "react";
import "./Calculator.css";

export default function App() {
  const [screen, setScreen] = useState("0");
  const [lastOperator, setLastOperator] = useState("0");
  const [state, setState] = useState("S0");

  useEffect(() => {
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");

    if (plusBtn && minusBtn) {
      plusBtn.classList.remove("cal_button_orange", "cal_button_Green");
      minusBtn.classList.remove("cal_button_orange", "cal_button_Green");

      plusBtn.classList.add(
        lastOperator === "+" ? "cal_button_orange" : "cal_button_Green"
      );
      minusBtn.classList.add(
        lastOperator === "-" ? "cal_button_orange" : "cal_button_Green"
      );
    }
  }, [lastOperator, screen]);

  const ceClicked = () => {
    setScreen("0");
    setState("S0");
    setLastOperator("0");
  };

  const equalClick = () => {
    try {
      // ใช้ eval แปลงสมการ
      const result = eval(screen.replace("÷", "/").replace("x", "*"));
      setScreen(result.toString());
    } catch {
      setScreen("Error");
    }
    setState("S0");
    setLastOperator("0");
  };

  const operatorClick = (operator) => {
    if (state === "S0" && operator !== "-") return;

    if (state === "S1") {
      setScreen(screen + operator);
      setLastOperator(operator);
      setState("S2");
    } else if (state === "S2") {
      setScreen(screen.slice(0, -1) + operator);
      setLastOperator(operator);
    }
  };

  const numberClick = (number) => {
    if (state === "S0") {
      setScreen(number.toString());
      setState("S1");
    } else if (state === "S1") {
      if (screen.length < 15) {
        setScreen(screen + number.toString());
      }
    } else if (state === "S2") {
      setScreen(screen + number.toString());
      setState("S1");
    }
  };

  //  จุดทศนิยม
  const dotClick = () => {
    const parts = screen.split(/[\+\-\*\/]/);
    const last = parts[parts.length - 1];
    if (!last.includes(".")) setScreen(screen + ".");
  };

  //  เปลี่ยนเครื่องหมาย +/-
  const toggleSign = () => {
    try {
      const value = parseFloat(screen);
      if (!isNaN(value)) setScreen((-value).toString());
    } catch {}
  };

  //  หาร 1/x
  const reciprocal = () => {
    try {
      const value = parseFloat(screen);
      if (value === 0) return setScreen("Error");
      setScreen((1 / value).toString());
    } catch {
      setScreen("Error");
    }
  };

  //  รากที่สอง
  const squareRoot = () => {
    try {
      const value = parseFloat(screen);
      if (value < 0) return setScreen("Error");
      setScreen(Math.sqrt(value).toString());
    } catch {
      setScreen("Error");
    }
  };

  //  เปอร์เซ็นต์
  const percent = () => {
    try {
      const value = parseFloat(screen);
      setScreen((value / 100).toString());
    } catch {
      setScreen("Error");
    }
  };

  const checkKeyboard = (event) => {
    if (event.key >= "0" && event.key <= "9") {
      numberClick(event.key);
    } else if (["+", "-", "*", "/", "x", "÷"].includes(event.key)) {
      operatorClick(event.key);
    } else if (event.key === "Enter") {
      equalClick();
    } else if (event.key === ".") {
      dotClick();
    } else if (event.key === "Backspace") {
      const newScreen = screen.slice(0, -1) || "0";
      setScreen(newScreen);
      if (newScreen === "0") setState("S0");
    } else if (event.key === "Escape") {
      ceClicked();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", checkKeyboard);
    return () => document.removeEventListener("keydown", checkKeyboard);
  });

  return (
    <div>
      <div className="cal_container">
        <div id="screen" className="cal_screen">
          {screen}
        </div>
        <div>
          <button className="cal_button cal_button_Green" disabled>MC</button>
          <button className="cal_button cal_button_Green" disabled>MR</button>
          <button className="cal_button cal_button_Green" disabled>M+</button>
          <button className="cal_button cal_button_Green" disabled>M-</button>
          <button className="cal_button cal_button_red" onClick={ceClicked}>CE</button>
        </div>
        <div>
          {[7, 8, 9].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          <button className="cal_button cal_button_Green" onClick={() => operatorClick("÷")}>÷</button>
          <button className="cal_button cal_button_Green" onClick={squareRoot}>√</button>
        </div>
        <div>
          {[4, 5, 6].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          <button className="cal_button cal_button_Green" onClick={() => operatorClick("x")}>x</button>
          <button className="cal_button cal_button_Green" onClick={percent}>%</button>
        </div>
        <div>
          {[1, 2, 3].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          <button id="minus" className="cal_button cal_button_Green" onClick={() => operatorClick("-")}>-</button>
          <button className="cal_button cal_button_Green" onClick={reciprocal}>1/x</button>
        </div>
        <div>
          <button className="cal_button cal_button_blue" onClick={() => numberClick(0)}>0</button>
          <button className="cal_button cal_button_blue" onClick={dotClick}>.</button>
          <button className="cal_button cal_button_blue" onClick={toggleSign}>+/-</button>
          <button id="plus" className="cal_button cal_button_Green" onClick={() => operatorClick("+")}>+</button>
          <button className="cal_button cal_button_Green" onClick={equalClick}>=</button>
        </div>
      </div>
    </div>
  );
}
