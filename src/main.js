import "./style.css";
import enemy1Img from './assets/images/enemies/1.jpg';
import enemy2Img from './assets/images/enemies/2.jpg';
import enemy3Img from './assets/images/enemies/3.jpg';

const myStorage = window.localStorage;

//Registration Page

const registrationPage = document.querySelector(".registration");
const registrationButton = document.querySelector(".registration__button");
const registrationInput = document.querySelector(".registration__input");
const homePage = document.querySelector(".home-page");
const characterPage = document.querySelector(".character-page");
const settingsPage = document.querySelector(".settings-page");
const header = document.querySelector(".header");
const battlePlayerName = document.querySelector(".battle-page__character-name");

function registersCharacterName() {
  const characterName = registrationInput.value;
  myStorage.setItem("characterName", characterName);
  nameOnCharacterName.textContent = myStorage.getItem("characterName");
  settingsPlayerName.textContent = characterName;
  battlePlayerName.textContent = characterName;
  registrationPage.classList.add("close");
  homePage.classList.remove("close");
  header.classList.remove("close");
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

//Header Navigation
const homeIcon = document.querySelector(".header__icon--home");
const characterIcon = document.querySelector(".header__icon--character");
const settingsIcon = document.querySelector(".header__icon--settings");
const pagesNodeList = document.querySelectorAll(".section");
const sectionName = document.querySelector(".header__page-name");

function goHome() {
  pagesNodeList.forEach((item) => item.classList.add("close"));
  homePage.classList.remove("close");
  sectionName.textContent = "Main";
}
function goCharacter() {
  pagesNodeList.forEach((item) => item.classList.add("close"));
  characterPage.classList.remove("close");
  sectionName.textContent = "Character";
  nameOnCharacterName.textContent = myStorage.getItem("characterName");
}
function goSettings() {
  pagesNodeList.forEach((item) => item.classList.add("close"));
  settingsPage.classList.remove("close");
  sectionName.textContent = "Settings";
}

homeIcon.addEventListener("click", goHome);
characterIcon.addEventListener("click", goCharacter);
settingsIcon.addEventListener("click", goSettings);

//Home Page

const fightButton = document.querySelector(".home-page__button");
const battlePage = document.querySelector(".battle-page");

function fightClick() {
  if (!endGameBanner.classList.contains("close")) {
    resetFight();
  }
  pagesNodeList.forEach((item) => item.classList.add("close"));
  battlePage.classList.remove("close");
  sectionName.textContent = "Battle";
}

fightButton.addEventListener("click", fightClick);

// Character Page

const selection = document.querySelector(".chars-selection");
const mainAvatar = document.querySelector(".character-page__avatar");
const mainAvatarImg = document.querySelector(".character-page__avatar-img");
const avatars = document.querySelectorAll(".chars-selection__item-avatar");
const nameOnCharacterName = document.querySelector(
  ".character-page__character-name"
);
const charsSelectionCloseButton = document.querySelector(
  ".chars-selection__close"
);

if (myStorage.getItem("wins") === null) {
  myStorage.setItem("wins", 0);
}
if (myStorage.getItem("loses") === null) {
  myStorage.setItem("loses", 0);
}

const wins = document.querySelector(".wins-value");
const loses = document.querySelector(".loses-value");

wins.textContent = myStorage.getItem("wins");
loses.textContent = myStorage.getItem("loses");

function toggleSelectionPanel() {
  selection.classList.toggle("close");
}

avatars.forEach((item) => {
  item.addEventListener("click", () => {
    const newSrc = item.getAttribute("src");
    mainAvatarImg.setAttribute("src", newSrc);
    battleAvatar.setAttribute("src", newSrc);
  });
});

mainAvatar.addEventListener("click", toggleSelectionPanel);
charsSelectionCloseButton.addEventListener("click", toggleSelectionPanel);

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
    settingsInput.setAttribute("value", myStorage.getItem("characterName"));
    settingsButton.textContent = "Save";
  } else {
    settingsPlayerName.classList.remove("settings-page__player-name--close");
    settingsInput.classList.remove("settings-page__input--open");
    settingsButton.textContent = "Edit";
    const newName = settingsInput.value;
    myStorage.setItem("characterName", newName);
    settingsPlayerName.textContent = newName;
    battlePlayerName.textContent = newName;
  }
}
settingsInput.addEventListener("input", controlButtonaVailabilitySettings);
settingsButton.addEventListener("click", buttonFunc);

// Battle Page

const attackBtn = document.querySelector(".battle-settings__button");
const logArea = document.querySelector(".battle-page__log-block");
const checkboxAttackNodeList = document.querySelectorAll(
  ".battle-settings__input--attack"
);
const checkboxDefenceNodeList = document.querySelectorAll(
  ".battle-settings__input--defence"
);
const battleAvatar = document.querySelector(".battle-page__character-img");

function attack() {
  fight();
}

const checkboxAttackArray = Array.from(checkboxAttackNodeList);
const checkboxDefenceArray = Array.from(checkboxDefenceNodeList);

function isAttackBtnDisabled() {
  const chekedBoxAttack = checkboxAttackArray
    .filter((item) => item.checked)
    .map((item) => item.value);

  const chekedBoxDefence = checkboxDefenceArray
    .filter((item) => item.checked)
    .map((item) => item.value);

  if (chekedBoxAttack.length === 1 && chekedBoxDefence.length === 2) {
    attackBtn.disabled = false;
  } else {
    attackBtn.disabled = true;
  }
}

checkboxAttackArray.forEach((checkbox) =>
  checkbox.addEventListener("change", isAttackBtnDisabled)
);
checkboxDefenceArray.forEach((checkbox) =>
  checkbox.addEventListener("change", isAttackBtnDisabled)
);
attackBtn.addEventListener("click", attack);

const attackZones = ["Head", "Neck", "Body", "Belly", "Legs"];
const defenceZones = ["Head", "Neck", "Body", "Belly", "Legs"];
const pBarHero = document.querySelector(".hero__progress");
const pBarEnemy = document.querySelector(".enemy__progress");
const endGameBanner = document.querySelector(".end-board");
const endGameBannerText = document.querySelector(".end-board__text");
const endGameBannerButton = document.querySelector(".end-board__close");
const enemyName = document.querySelector(".battle-page__character-name--enemy");
const enemyImg = document.querySelector(".battle-page__character-img--enemy");

const damage = 10;
const heroHealth = 100;
const enemyHealth = 100;
let currentHeroHealth = 100;
let currentEnemyHealth = 100;

const enemy1 = {
  name: "Madara",
  countAttackZones: 2,
  countDefenceZones: 1,
  img: enemy1Img,
};

const enemy2 = {
  name: "Pain",
  countAttackZones: 1,
  countDefenceZones: 3,
  img: enemy2Img,
};
const enemy3 = {
  name: "Itachi",
  countAttackZones: 2,
  countDefenceZones: 2,
  img: enemy3Img,
};

const enemies = [enemy1, enemy2, enemy3];

function randomEnemy(arr) {
  let [enemy] = shuffle(arr, 1);
  enemyName.textContent = enemy.name;
  enemyImg.setAttribute("src", enemy.img);
  return enemy;
}

let currentEnemy = randomEnemy(enemies);


function shuffle(arr, count) {
  const currentArr = [...arr];

  for (let i = currentArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentArr[i], currentArr[j]] = [currentArr[j], currentArr[i]];
  }

  return currentArr.slice(0, count);
}

function countCommonElements(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item)).length;
}

function updateProcessBar(processBar, value) {
  processBar.querySelector(".progress__fill").style.width = `${value}%`;
  processBar.querySelector(".progress__text").textContent = `${value}/ 100`;
}

function closeEndBannerGame() {
  goCharacter();
}
endGameBannerButton.addEventListener("click", closeEndBannerGame);

function resetFight() {
  
  currentHeroHealth = heroHealth;
  currentEnemyHealth = enemyHealth;
  updateProcessBar(pBarHero, currentHeroHealth);
  updateProcessBar(pBarEnemy, currentEnemyHealth);
  logArea.innerHTML = "";
  checkboxAttackArray.forEach((checkbox) => (checkbox.checked = false));
  checkboxDefenceArray.forEach((checkbox) => (checkbox.checked = false));
  attackBtn.disabled = true;
  endGameBanner.classList.add("close");
  currentEnemy = randomEnemy(enemies);
}

updateProcessBar(pBarHero, 100);
updateProcessBar(pBarEnemy, 100);

function fight() {
  
  const chekedBoxAttack = checkboxAttackArray
    .filter((item) => item.checked)
    .map((item) => item.value);

  const chekedBoxDefence = checkboxDefenceArray
    .filter((item) => item.checked)
    .map((item) => item.value);

  const enemyAttack = shuffle(attackZones, currentEnemy.countAttackZones);
  const enemyDefence = shuffle(defenceZones, currentEnemy.countDefenceZones);

  const heroDamage =
    damage *
    (chekedBoxAttack.length -
      countCommonElements(chekedBoxAttack, enemyDefence));

  const enemyDamage =
    damage *
    (enemyAttack.length - countCommonElements(enemyAttack, chekedBoxDefence));

  currentHeroHealth -= enemyDamage;
  currentEnemyHealth -= heroDamage;

  updateProcessBar(pBarHero, currentHeroHealth);
  updateProcessBar(pBarEnemy, currentEnemyHealth);

  if (currentHeroHealth <= 0) {
    myStorage.setItem("loses", (loses.textContent = +loses.textContent + 1));

    endGameBanner.classList.remove("close");
    endGameBannerText.textContent =
      "You lost. Don't overdo it, maybe you'll get lucky in love";
  }
  if (currentEnemyHealth <= 0) {
    myStorage.setItem("wins", (wins.textContent = +wins.textContent + 1));

    endGameBanner.classList.remove("close");
    endGameBannerText.textContent = "Congratulations on your victory!";
  }

  logArea.scrollTop = logArea.scrollHeight;

  if (enemyDefence.includes(chekedBoxAttack[0])) {
    let log1 = document.createElement("p");
    log1.innerHTML = `<span>${myStorage.getItem(
      "characterName"
    )}</span> attacked <span>${currentEnemy.name}</span> to <span>${
      chekedBoxAttack[0]
    }</span> but <span>${currentEnemy.name}</span> was able to protect his ${
      chekedBoxAttack[0]
    }.`;
    logArea.append(log1);
  } else {
    let log1 = document.createElement("p");
    log1.innerHTML = `<span>${myStorage.getItem(
      "characterName"
    )}</span> attacked <span>${currentEnemy.name}</span> to <span>${
      chekedBoxAttack[0]
    }</span> and deal <span>10 damage</span>.`;
    logArea.append(log1);
  }

  for (let attack of enemyAttack) {
    if (chekedBoxDefence.includes(attack)) {
      let log2 = document.createElement("p");
      log2.innerHTML = `<span>${
        currentEnemy.name
      }</span> attacked <span>${myStorage.getItem(
        "characterName"
      )}</span> to <span>${attack}</span> but <span>${myStorage.getItem(
        "characterName"
      )}</span> was able to protect his ${attack}.`;
      logArea.append(log2);
    } else {
      let log2 = document.createElement("p");
      log2.innerHTML = `<span>${
        currentEnemy.name
      }</span> attacked <span>${myStorage.getItem(
        "characterName"
      )}</span> to <span>${attack}</span> and deal <span>10 damage</span>.`;
      logArea.append(log2);
    }
  }
}
