import { useState, useRef, useEffect } from "react";
import "./styles.css";

const OTP_DIGITS = 5;

export default function App() {
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGITS).fill(""));
  const ref = useRef([]);
  useEffect(() => {
    ref.current[0]?.focus();
  }, []);
  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArray = [...inputArr];
    newArray[index] = newValue.slice(-1);
    setInputArr(newArray);

    newValue && ref.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      ref.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>Enter OTP</h1>
      {inputArr.map((input, index) => {
        return (
          <input
            type="text"
            key={index}
            className="otpBox"
            value={inputArr[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            ref={(input) => (ref.current[index] = input)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
