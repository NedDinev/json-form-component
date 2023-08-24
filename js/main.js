import { generateFormComponents } from "./formComponents.js";
import { setDefaults, resetValues, saveValues } from "./formActions.js";


const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  if (button.textContent === "Set Defaults") {
    button.addEventListener("click", setDefaults);
  } else if (button.textContent === "Reset") {
    button.addEventListener("click", resetValues);
  } else if (button.textContent === "Save") {
    button.addEventListener("click", saveValues);
  }
});


generateFormComponents();
