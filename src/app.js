/* eslint-disable */
import "bootstrap";
import "./style.css";

const expressions = {
  card: /^\d{16}$/, // 16 numeros.
  cvc: /^\d{3}$/, // 3 numeros.
  amount: /^\d+(\.\d{1,2})?$/, // d+ uno o mas digitos, /./d{1,2} un punto seguiddo por uno o dos digitos(opcional).
  firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  city: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  state: /.+/, // No campos vacios
  postalCode: /^\d+$/, // Numeros
  radioOptions: /.+/, // No campos vacios
  message: /^[a-zA-Z0-9\s.,!?]{1,500}$/ // Letras, números, espacios y signos de puntuación básicos, como puntos, comas, signos de exclamación e interrogación.
};

const errorMessages = {
  card: "The field must have 16 numbers",
  cvc: "The field must have 3 numbers",
  amount: "The field must be numeric",
  firstName: "This field must contain only letters",
  lastName: "This field must contain only letters",
  city: "This field must contain only letters",
  state: "You must select an option",
  postalCode: "The field must be numeric",
  radioOptions: "You must select an option",
  message: "The message must be between 1 and 500 characters."
};

const form = document.getElementById("form");
const formFields = document.querySelectorAll(
  "input[type='text'], input[type='password'], textarea, select"
);
const formRadioField = document.querySelectorAll("input[type='radio");

const generateError = (boolean, name, parent) => {
  if (boolean) {
    // when validation is fulfilled
    parent.classList.remove("error");
    const message = parent.querySelector(`#${name}-error`);
    if (message) {
      parent.removeChild(message);
    }
  } else {
    // when validation it not fulfilled
    parent.classList.add("error");
    const errorMessage = parent.querySelector(`#${name}-error`);

    console.log(parent);
    // validate if the error exists
    if (!errorMessage) {
      // if it does not exist, we add it
      const message = document.createElement("p");
      message.setAttribute("id", `${name}-error`);
      message.textContent = errorMessages[name];

      parent.appendChild(message);
    }
  }
};
// for text and password inputs; textarea and select
const validateField = node => {
  const name = node.name;
  const value = node.value;
  const parent = node.parentElement;
  const validation = expressions[name];

  if (!validation) return;
  generateError(value.match(validation), name, parent);
};

//  for radio input
const validateRadio = () => {
  const checked = Array.from(formRadioField).find(field => {
    return field.checked;
  });

  const firstElement = formRadioField[0];

  generateError(
    checked,
    firstElement.name,
    firstElement.parentElement.parentElement.parentElement
  );
};

// event listener for radio input
formRadioField.forEach(field => {
  field.addEventListener("change", () => {
    validateRadio();
  });
});

// event listener for text, password inputs; textarea and select
formFields.forEach(field => {
  field.addEventListener("change", e => {
    const node = e.target;
    validateField(node);
  });
});

// submit event listener
form.addEventListener("submit", e => {
  e.preventDefault();

  formFields.forEach(field => {
    validateField(field);
  });
  validateRadio();

  // Clean if there are no errors
  let hasError = false;

  formFields.forEach(field => {
    if (field.parentElement.classList.contains("error")) {
      hasError = true;
    }
  });

  if (!hasError) {
    formFields.forEach(field => {
      field.value = "";
    });

    formRadioField.forEach(radio => {
      radio.checked = false;
    });
  }
});
