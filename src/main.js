import "./style.css";

//Registration Page

const registrationPage = document.querySelector(".registration");
const registrationButton = document.querySelector(".registration__button");
const registrationInput  = document.querySelector(".registration__input");

let characterName;

function registersCharacterName() {
  characterName = registrationInput.value;
  settingsPlayerName.textContent = characterName;
  registrationPage.classList.add("registration--close");
}

function controlButtonaVailability() {
  if (registrationInput.value) {
    registrationButton.disabled = false;
  } else {
    registrationButton.disabled = true;
  }
}

registrationInput.addEventListener("input", controlButtonaVailability);
registrationButton.addEventListener("click", registersCharacterName);

// Character Page

const selection = document.querySelector(".chars-selection");
const mainAvatar = document.querySelector(".character-page__avatar");
const mainAvatarImg = document.querySelector(".character-page__avatar-img");
const avatars = document.querySelectorAll(".chars-selection__item-avatar");
const charsSelectionCloseButton = document.querySelector(
  ".chars-selection__close"
);

function closeSectionPanel() {
  selection.classList.add("chars-selection--close");
}

function openSectionPanel() {
  selection.classList.remove("chars-selection--close");
}

avatars.forEach((item) => {
  item.addEventListener("click", () => {
    const newSrc = item.getAttribute("src");
    mainAvatarImg.setAttribute("src", newSrc);
  });
});

mainAvatar.addEventListener("click", openSectionPanel);
charsSelectionCloseButton.addEventListener("click", closeSectionPanel);

// Settings Page

const settingsButton = document.querySelector(".settings-page__button");
const settingsPlayerName = document.querySelector(
  ".settings-page__player-name"
);
const settingsInput = document.querySelector(".settings-page__input");

function controlButtonaVailabilitySettings() {
  if (settingsInput.value) {
    settingsButton.disabled = false;
  } else {
    settingsButton.disabled = true;
  }
}
function buttonFunc() {
  if (settingsButton.textContent === "Edit") {
    settingsPlayerName.classList.add("settings-page__player-name--close");
    settingsInput.classList.add("settings-page__input--open");
    settingsInput.setAttribute("value", characterName);
    settingsButton.textContent = "Save";
  } else {
    settingsPlayerName.classList.remove("settings-page__player-name--close");
    settingsInput.classList.remove("settings-page__input--open");
    settingsButton.textContent = "Edit";
    characterName = settingsInput.value;
    settingsPlayerName.textContent = characterName;
  }
}
settingsInput.addEventListener("input", controlButtonaVailabilitySettings);
settingsButton.addEventListener("click", buttonFunc);
