import data from "../example.json" assert { type: "json" };

export function generateFormComponents() {
  const formContainer = document.querySelector(".form-container");
  const props = data.props;
  const meta = data.meta;

  // clear form container
  formContainer.innerHTML = "";

  // iterate over each meta property
  for (let prop in meta) {
    const propData = meta[prop];
    const propValue = props[prop] || propData.defaultValue;

    const container = document.createElement("div");
    container.classList.add("container");

    const label = document.createElement("label");
    label.textContent = propData.label;
    let element;
    if (propData.type === "checkbox") {
      element = document.createElement("input");
      element.classList.add(prop);
      element.type = "checkbox";
      element.checked = propValue === "true";
    } else if (propData.type === "radio") {
      const radioContainer = document.createElement("div");
      for (let value in propData.values) {
        const radioValue = Object.keys(propData.values[value])[0];
        const radioLabel = propData.values[value][radioValue];

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = prop;
        radio.classList.add(prop);
        radio.value = radioValue;
        radio.checked = radioValue === propValue;

        const radioLabelElement = document.createElement("label");
        radioLabelElement.textContent = radioLabel;

        radioContainer.appendChild(radio);
        radioContainer.appendChild(radioLabelElement);
      }
      element = radioContainer;
    } else if (propData.type === "dropdown") {
      element = document.createElement("select");
      element.classList.add(prop);
      for (let value in propData.values) {
        const dropdownValue = Object.keys(propData.values[value])[0];
        const dropdownLabel = propData.values[value][dropdownValue];

        const option = document.createElement("option");
        option.value = dropdownValue;
        option.textContent = dropdownLabel;
        option.selected = dropdownValue === propValue;

        element.appendChild(option);
      }
    } else if (propData.type === "input") {
      element = document.createElement("input");
      element.classList.add(prop);
      element.type = "text";
      element.value = propValue;
    }

    container.appendChild(label);
    container.appendChild(element);
    formContainer.appendChild(container);
  }
}
