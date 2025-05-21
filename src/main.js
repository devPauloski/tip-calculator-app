const form = document.querySelector("form");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipButtons = document.querySelectorAll(".tip-button");
const customTipInput = document.querySelector(".custom-tip-input");
const outputTipValue = document.querySelector(".output-tip-value");
const outputTotalValue = document.querySelector(".output-total-value");

billInput.addEventListener("input", (event) => {
  const input = event.target;
  let billValue = input.value.replace(/[^0-9.]/g, '');

  const splitValueByDot = billValue.split(".");
  // keep only one dot
  if (splitValueByDot.length > 2) {
    billValue = splitValueByDot[0] + "." + splitValueByDot[1]; 
  }

  // Limit to 2 decimal places
  if (splitValueByDot.length === 2) {
    splitValueByDot[1] = splitValueByDot[1].slice(0, 2);
    billValue = splitValueByDot[0] + "." + splitValueByDot[1];
  }

  const number = parseFloat(billValue);

  if (!isNaN(number)) {
    const [integerPart, decimalPart] = billValue.split('.');
    input.value = new Intl.NumberFormat().format(parseInt(integerPart)) + (decimalPart !== undefined ? '.' + decimalPart : '');
  } else {
    input.value = "";
  }
});

peopleInput.addEventListener("input", (event) => {
  const input = event.target;
  let peopleValue = input.value.replace(/[^0-9]/g, '');
  input.value = peopleValue;
});

customTipInput.addEventListener("input", (event) => {
  const input = event.target;
  let customTipValue = input.value.replace(/[^0-9]/g, '');
  input.value = customTipValue;
});


form.addEventListener("submit", (event) => {
  event.preventDefault();

  let validInput = true;

  if (billInput.value === 0) {
    validInput = false;
  }
});
