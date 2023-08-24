import data from "../example.json" assert { type: "json" };
import { generateFormComponents } from "./formComponents.js";

export function setDefaults() {
  for (let prop in data.meta) {
    const defaultValue = data.meta[prop].defaultValue;
    data.props[prop] = defaultValue;
  }
  generateFormComponents();
}

export function resetValues() {
  location.reload();
}

export function saveValues() {
  const formContainer = document.querySelector(".form-container");
  const inputs = formContainer.querySelectorAll(
    "input[type=text], input[type=checkbox], input[type=radio]:checked, select"
  );

  inputs.forEach((input) => {
    const prop = input.className;
    let value;

    if (input.type === "checkbox") {
      value = input.checked.toString();
    } else if (input.type === "radio") {
      value = input.value.toString();
    } else if (input.tagName === "SELECT") {
      value = input.options[input.selectedIndex].text;
    } else if (input.type === "text") {
      value = input.value;
    }

    data.props[prop] = value;
  });

  // removes the previous output if it exists
  const previousOutput = document.querySelector(".output");
  if (previousOutput) {
    previousOutput.remove();
  }

  const output = document.createElement("div");
  output.classList.add("output");

  output.textContent = JSON.stringify(data, null, 2);

  document.body.appendChild(output);
}
