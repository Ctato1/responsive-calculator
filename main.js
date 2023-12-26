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

  if (/[0-9]/.test(target)) {
    let selectedNum = target;
    if (!clicked) {
      currentValue.textContent = "";
      clicked = true;
    }
    currentValue.textContent += +selectedNum;
    current = +currentValue.textContent;
  }

  if (target == "." && !isDot) {
    currentValue.textContent += ".";
    isDot = true;
  }

  if (["-", "+", "/", "*"].includes(target)) {
    textControl(target);
  }

  if (target === "all-clear" && current) {
    let numberString = current.toString();
    current = +numberString.slice(0, -1);
    currentValue.textContent = current;
    if (numberString.length === 1) {
      current = 0;
      currentValue.textContent = current;
    }
  }

  if (target === "reset") {
    location.reload();
  }

  if (target === "=" && checkOperation && clicked) {
    let result = operation(checkOperation);
    prevValue.textContent = "0";
    current = result;
    currentValue.textContent = result.toFixed(2);
    clicked = false;
  }
});

function textControl(target) {
  isDot = false;
  checkOperation = target;
  clicked = false;
  prev = current;
  prevValue.textContent = prev;

  current = "";
  currentValue.textContent = "0";
}

function operation(oper) {
  if (oper === "-") return prev - current;
  if (oper === "+") return prev + current;
  if (oper === "/") return prev / current;
  if (oper === "*") return prev * current;
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
