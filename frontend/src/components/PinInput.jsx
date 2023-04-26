import React, { useEffect, useRef, useState } from "react";
import "../App.css";
const PinInput = ({ length = 5, inputBoxLength = 4, onChange, Type }) => {
  const [inputArray, setInputArray] = useState(new Array(length).fill(""));
  const inputRef = useRef(new Array(length).fill(null));

  const handlePaste = (e) => {
    e.preventDefault();

    let clipboard = e.clipboardData.getData("Text");
    var k = 0;
    inputRef.current.forEach((el, i) => {
      let collect = "";

      for (let j = k; j < k + inputBoxLength; j++) {
        if (clipboard[j] !== undefined) {
          collect += clipboard[j];
        }
      }
      k = k + inputBoxLength;
      el.value = collect;
      inputArray[i] = collect;
      el.focus();
    });
  };

  const handleChange = (e, index) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    console.log(e.target.maxLength);

    if (
      (e.keyCode == "8" || e.keyCode == "46") &&
      index !== 0 &&
      e.target.value.length == 0
    ) {
      let newArray = [...inputArray];
      newArray[index] = "";
      setInputArray([...newArray]);
      inputRef.current[index - 1].focus();
    } else {
      if (
        index < length - 1 &&
        e.target.value !== "" &&
        e.target.value.length == inputBoxLength
      ) {
        inputRef.current[index + 1].focus();
        let newArray = [...inputArray];
        newArray[index] = e.target.value;
        setInputArray([...newArray]);
      } else if (index == length - 1 || e.target.value.length > 0) {
        let newArray = [...inputArray];
        newArray[index] = e.target.value;
        setInputArray([...newArray]);
      } else if (
        (e.keyCode == "8" || e.keyCode == "46") &&
        index == 0 &&
        e.target.value.length == 0
      ) {
        let newArray = [...inputArray];
        newArray[index] = "";
        setInputArray([...newArray]);
      }
    }
  };
  useEffect(() => {
    if (onChange) {
      onChange(inputArray);
    }
  }, [inputArray]);

  let bs = "rgb(38, 57, 77) 0px 20px 30px -10px";

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        display: "flex",
        justifyContent: "center",
      }}
      onPaste={handlePaste}
    >
      {inputArray.map((el, index) => (
        <input
          style={{
            height: "40px",
            border:"1px solid teal",
            width: "40px",
            margin: "10px",
            fontSize:"25px",
            textAlign:"center",
            boxShadow: bs,
        
          }}
          key={index}
          type={Type}
          step="1"
          maxLength={inputBoxLength}
          onKeyUp={(e) => handleChange(e, index)}
          ref={(element) => (inputRef.current[index] = element)}
        ></input>
      ))}
    </div>
  );
};

export default PinInput;
