const form = document.querySelector("form");
const billInput = document.querySelector(".bill-input");
const tipButtons = document.querySelectorAll(".tip-button");
const customTipInput = document.querySelector(".custom-tip-input");
const peopleInput = document.querySelector(".people-input");
const outputTipValue = document.querySelector(".output-tip-value");
const outputTotalValue = document.querySelector(".output-total-value");

let selectedTipValue = "";

billInput.addEventListener("input", (event) => {
  const input = event.target;
  let billValue = input.value.replace(/[^0-9.]/g, "");

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
    const [integerPart, decimalPart] = billValue.split(".");
    input.value =
      new Intl.NumberFormat().format(parseInt(integerPart)) +
      (decimalPart !== undefined ? "." + decimalPart : "");
  } else {
    input.value = "";
  }

  computeTipResult();
});

peopleInput.addEventListener("input", (event) => {
  const input = event.target;
  let peopleValue = input.value.replace(/[^0-9]/g, "");
  input.value = peopleValue;
  computeTipResult();
});

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", (event) => {
    let selectedTipButton = event.target;
    selectedTipValue = parseFloat(selectedTipButton.dataset.value);

    tipButtons.forEach((tipButton) => tipButton.classList.remove("selected"));
    selectedTipButton.classList.add("selected");

    customTipInput.value = "";

    computeTipResult();
  });
});

customTipInput.addEventListener("input", (event) => {
  const input = event.target;
  let customTipValue = input.value.replace(/[^0-9]/g, "");
  input.value = customTipValue;

  if (input.value) {
    selectedTipValue = parseFloat(input.value) / 100;
    tipButtons.forEach((tipButton) => tipButton.classList.remove("selected"));
    computeTipResult();
  } else {
    selectedTipValue = "";
    computeTipResult();
  }
});

const computeTipResult = () => {
  let validInput = true;

  if (billInput.value === "") validInput = false;
  if (selectedTipValue === "") validInput = false;
  if (peopleInput.value === "" || peopleInput.value === "0") validInput = false;

  if (validInput) {
    const billAmount = parseFloat(billInput.value.replaceAll(",", ""));
    const tipPercent = selectedTipValue;
    const peopleCount = parseFloat(peopleInput.value);

    const tipAmountPerPerson = new Intl.NumberFormat().format(
      ((tipPercent * billAmount) / peopleCount).toFixed(2)
    );
    const totalAmountPerPerson = new Intl.NumberFormat().format(
      (((1 + tipPercent) * billAmount) / peopleCount).toFixed(2)
    );

    outputTipValue.textContent = `$${tipAmountPerPerson}`;
    outputTotalValue.textContent = `$${totalAmountPerPerson}`;
  } else {
    outputTipValue.textContent = "$0.00";
    outputTotalValue.textContent = "$0.00";
  }
};
