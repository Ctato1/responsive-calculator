const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const input = select("header input");
const themeColors = selectAll(".theme-color");
const themeNumbers = selectAll(".number-theme");
const valueContent = select(".value__content");
const keys = select(".calculator-keys");
const deleteBtn = select(".delete");
const resetBtn = select(".reset");
const equalBtn = select(".equal-sign");
const prevValue = select("#prev-value");
const currentValue = select("#current-value");
const body = select("body");

let current,
  prev,
  clicked = false,
  checkOperation = "",
  isDot = false;

  keys.addEventListener("click", (e) => {
    let target = e.target.value;
    console.log(target);
  
    if (!target) return; // Return early if the target has no value
  
    // Store the expression as a string
    if (!/[=]/.test(target)) {
      // If target is not '='
      if (target === "reset") {
        resetCalculator();
        return;
      }
      if (target === "all-clear") {
        // Handle deleting the last entry
        currentValue.textContent = currentValue.textContent.slice(0, -1);
        current = currentValue.textContent;
        return;
      }
  
      if (!clicked) {
        currentValue.textContent = "";
        clicked = true;
      }
  
      if (target === "." && !isDot) {
        currentValue.textContent += ".";
        isDot = true;
      } else if (/[0-9]/.test(target)) {
        currentValue.textContent += target; 
        current = currentValue.textContent;
      } else if (["-", "+", "/", "*"].includes(target)) {
        if (currentValue.textContent) {
          prevValue.textContent = currentValue.textContent;
          currentValue.textContent += ` ${target} `;
        }
        isDot = false; 
      }
    } else if (target === "=") {
      try {
        
        let expression = currentValue.textContent.replace(/\s+/g, '');
        if (expression) {
          let result = eval(currentValue.textContent); 
          currentValue.textContent = result.toFixed(2); 
          prevValue.textContent = "";
          current = result.toString(); 
        }
      } catch (error) {
        currentValue.textContent = "Error"; 
      }
    }
  });
  
  function resetCalculator() {
    current = "";
    prev = "";
    clicked = false;
    isDot = false;
    currentValue.textContent = "0";
    prevValue.textContent = "0";
  }
  

input.addEventListener("input", (e) => {
  let value = +e.target.value;
  themeColors.forEach((item) => {
    item.style.color =
      value === 1 ? "#FFFFFF" : value === 2 ? "#36362C" : "#FFE53D";
    body.style.backgroundColor =
      value === 1 ? "#3a4663" : value === 2 ? "#E5E4E1" : "#17062A";
    valueContent.style.backgroundColor =
      value === 1 ? "#181F33" : value === 2 ? "#EEEEEE" : "#1E0936";
    keys.style.backgroundColor =
      value === 1 ? "#242D44" : value === 2 ? "#D2CDCD" : "#1E0936";
    deleteBtn.style.backgroundColor =
      value === 1 ? "#647198" : value === 2 ? "#378187" : "#56077C";
    resetBtn.style.backgroundColor =
      value === 1 ? "#647198" : value === 2 ? "#378187" : "#56077C";
    deleteBtn.style.boxShadow =
      value === 1
        ? "0px -4px 0px 0px #414E73 inset"
        : value === 2
        ? "0px -4px 0px 0px #1B6066 inset"
        : "0px -4px 0px 0px #BE15F4 inset";
    resetBtn.style.boxShadow =
      value === 1
        ? "0px -4px 0px 0px #414E73 inset"
        : value === 2
        ? "0px -4px 0px 0px #1B6066 inset"
        : "0px -4px 0px 0px #BE15F4 inset";
    equalBtn.style.backgroundColor =
      value === 1 ? "#D03F2F" : value === 2 ? "#C85402" : "#00DED0";
    equalBtn.style.boxShadow =
      value === 1
        ? "0px -4px 0px 0px #93261A inset"
        : value === 2
        ? "0px -4px 0px 0px #873901 inset"
        : "0px -4px 0px 0px #6CF9F1 inset";
  });

  themeNumbers.forEach((item) => {
    item.style.color =
      value === 1 ? "#434A59" : value === 2 ? "#36362C" : "#FFE53D";
    item.style.backgroundColor =
      value === 1 ? "#EAE3DC" : value === 2 ? "#E5E4E1" : "#331C4D";
    item.style.boxShadow =
      value === 1
        ? "0px -4px 0px 0px #B3A497 inset"
        : value === 2
        ? "0px -4px 0px 0px #A79E91 inset"
        : "0px -4px 0px 0px #881C9E inset";
  });
});
