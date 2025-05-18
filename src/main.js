const form = document.querySelector("form");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipOptions = document.querySelectorAll(".tip-option");
const outputTipValue = document.querySelector(".output-tip-value");
const outputTotalValue = document.querySelector(".output-total-value");

peopleInput.addEventListener("input", () => {
  peopleInput.value = peopleInput.value.trim();
});

billInput.addEventListener("focusout", () => {
  billInput.value = new Intl.NumberFormat().format(billInput.value.trim());
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
