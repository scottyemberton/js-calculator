import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const [justCalculated, setJustCalculated] = useState(false); // Add this state
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
      setJustCalculated(false);
    } else if (symbol === "negative") {
      if (justCalculated) {
        // Toggle the sign for the answer directly
        setAnswer(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
        setJustCalculated(false);
      } else {
        // Toggle the sign of the last number or operand in the expression
        const parts = expression.trim().split(/([*/+\-])/);
        const lastPart = parts.pop();
  
        if (lastPart) {
          const newPart = lastPart.startsWith('-') ? lastPart.slice(1) : '-' + lastPart;
          // Rebuild the expression with the toggled last part
          const newExpression = expression.slice(0, expression.lastIndexOf(lastPart)) + newPart;
          setExpression(newExpression);
        }
      }
    } else if (symbol === "percent") {
      if (justCalculated) {
        const percent = (parseFloat(answer) / 100).toString();
        setAnswer(percent);
        setExpression(percent);
      } else {
        const lastNumber = expression.split(/[-+/*]/g).pop();
        if (lastNumber) {
          const percent = (parseFloat(lastNumber) / 100).toString();
          setExpression(expression.slice(0, -lastNumber.length) + percent);
        }
      }
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
      setJustCalculated(false);
    } else if (symbol === "=") {
      calculate();
      setJustCalculated(true);
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };
  
  
  

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>TypeScript <br />Calculator</h1>
        <div id="calculator-wrapper">
          <div id="calculator">
            <div id="display" style={{ textAlign: "right" }}>
              <div id="answer">{answer}</div>
              <div id="expression">{expression}</div>
            </div>
            <button id="clear" 
                    onClick={() => buttonPress("clear")} 
                    className="action" 
                    aria-label="Clear">C</button>
            <button id="negative" 
                    onClick={() => buttonPress("negative")} 
                    className="symbol" 
                    aria-label="Toggle Sign">+/-</button>
            <button id="percentage" 
                    onClick={() => buttonPress("percent")} 
                    className="symbol" 
                    aria-label="Percentage">%</button>
            <button id="divide" 
                    onClick={() => buttonPress("/")} 
                    className="symbol" 
                    aria-label="Divide">/</button>
            <button id="seven" 
                    onClick={() => buttonPress("7")} 
                    className="number" 
                    aria-label="Seven">7</button>
            <button id="eight" 
                    onClick={() => buttonPress("8")} 
                    className="number" 
                    aria-label="Eight">8</button>
            <button id="nine" 
                    onClick={() => buttonPress("9")} 
                    className="number" 
                    aria-label="Nine">9</button>
            <button id="multiply" 
                    onClick={() => buttonPress("*")} 
                    className="symbol" 
                    aria-label="Multiply">*</button>
            <button id="four" 
                    onClick={() => buttonPress("4")} 
                    className="number" 
                    aria-label="Four">4</button>
            <button id="five" 
                    onClick={() => buttonPress("5")} 
                    className="number" 
                    aria-label="Five">5</button>
            <button id="six" 
                    onClick={() => buttonPress("6")} 
                    className="number" 
                    aria-label="Six">6</button>
            <button id="subtract" 
                    onClick={() => buttonPress("-")} 
                    className="symbol" 
                    aria-label="Subtract">-</button>
            <button id="one" 
                    onClick={() => buttonPress("1")}
                    className="number" 
                    aria-label="One">1</button>
            <button id="two" 
                    onClick={() => buttonPress("2")} 
                    className="number" 
                    aria-label="Two">2</button>
            <button id="three" 
                    onClick={() => buttonPress("3")} 
                    className="number" 
                    aria-label="Three">3</button>
            <button id="add" 
                    onClick={() => buttonPress("+")} 
                    className="symbol" 
                    aria-label="Add">+</button>
            <button id="zero" 
                    onClick={() => buttonPress("0")} 
                    className="number" 
                    aria-label="Zero">0</button>
            <button id="double-zero" 
                    onClick={() => buttonPress("00")} 
                    className="color" 
                    aria-label="Double Zero">00</button>
            <button id="decimal"
                    onClick={() => buttonPress(".")} 
                    className="symbol" 
                    aria-label="Decimal">.</button>
            <button id="equals" 
                    onClick={() => buttonPress("=")} 
                    className="action" 
                    aria-label="Equals">=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
