const form = document.querySelector("form");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipOptions = document.querySelectorAll(".tip-option");
const outputTipValue = document.querySelector(".output-tip-value");
const outputTotalValue = document.querySelector(".output-total-value");

billInput.addEventListener("input", () => {
  let billValue = billInput.value.replace(/[^0-9.]/g, "");
  let billValueSplit = billValue.split(".");

  if (billValueSplit.length >= 2) {
    billValue = billValueSplit[0] + "." + billValueSplit[1].slice(0, 2);
  }

  billInput.value = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(billValue);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
