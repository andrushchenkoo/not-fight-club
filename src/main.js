import "./style.css";

const registrationPage = document.querySelector(".registration");
const registrationButton = document.querySelector(".registration__button");
const inputValue = document.querySelector(".registration__input");

let characterName;

function registersCharacterName() {
  characterName = inputValue.value;
  registrationPage.classList.add('registration--close');
}

function controlButtonaVailability() {
  if (inputValue.value) {
    registrationButton.disabled = false;
  } else {
    registrationButton.disabled = true;
  }
}

inputValue.addEventListener("input", controlButtonaVailability);
registrationButton.addEventListener("click", registersCharacterName);
