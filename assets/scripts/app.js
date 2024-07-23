const ATTACK_VALUE = 20;
let stage = 0;
let chosenMaxLife = 100;
let newPlayerHealth = chosenMaxLife;
let newMonsterHealth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);

const damagePlayer = [];
const damageMonster = [];
let doesPlayerWin = true;

// bubble sort for check highest damage
const bubbleSort = (arr) => {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    if (arr[i] > arr[i + 1]) {
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
    }
  }
  return arr[length - 1];
};
// Toggle button status
const toggleBtn = (isGameActive) => {
  if (isGameActive) {
    startBtn.setAttribute("disabled", "");
    attackBtn.removeAttribute("disabled", "");
    strongAttackBtn.removeAttribute("disabled", "");
    healBtn.removeAttribute("disabled", "");
    logBtn.removeAttribute("disabled", "");
  } else {
    startBtn.removeAttribute("disabled");
    attackBtn.setAttribute("disabled", "");
    strongAttackBtn.setAttribute("disabled", "");
    healBtn.setAttribute("disabled", "");
    logBtn.setAttribute("disabled", "");
  }
};

const healthAssign = (newPlayerhealth, newMonsterHealth) => {
  playerHealthBar.max = newPlayerhealth;
  playerHealthBar.value = newPlayerhealth;
  monsterHealthBar.max = newMonsterHealth;
  monsterHealthBar.value = newMonsterHealth;
};

// Set
const nextStage = () => {
  startBtn.textContent = `Stage ${stage} - ${stage + 1}`;
  stage++;
  newMonsterHealth += chosenMaxLife * (1 + stage * 3 * Math.random() + stage);
  newPlayerHealth = chosenMaxLife * (1 + stage * 2);
  toggleBtn(true);
  healthAssign(newPlayerHealth, newMonsterHealth);
};

const sameStage = () => {
  startBtn.textContent = `Retry, stage ${stage}`;
  toggleBtn(true);
  healthAssign(newPlayerHealth, newMonsterHealth);
};

const gameEnd = () => {
  const alertText = `\nPlayer Health: ${
    playerHealthBar.value
  }\nMonster Health: ${
    monsterHealthBar.value
  }\nPlayer Highest Damage: ${bubbleSort(
    damagePlayer
  )}\nMonster Highest Damage: ${bubbleSort(
    damageMonster
  )}\nTotal Monster Health: ${newMonsterHealth}\nTotal Player Health: ${newPlayerHealth}`;
  if (monsterHealthBar.value === 0) {
    alert(`Stage: ${stage}\nYou win!` + alertText);
    doesPlayerWin = true;
  } else if (playerHealthBar.value === 0) {
    alert(`Stage: ${stage}\nYou lose..` + alertText);
    doesPlayerWin = false;
  } else {
    alert("Another error occurs");
  }
  damagePlayer.length = 0;
  damageMonster.length = 0;
  toggleBtn(false);
};
// handle moster damage to player
const monsterDamage = () => {
  const monsterAttack = Math.floor(Math.random() * stage * 3 + 10);
  damageMonster.push(monsterAttack);
  setTimeout(
    dealPlayerDamage,
    Math.random() * 200 * (20 - stage),
    monsterAttack
  );
};
// handle player damage to monster
const playerDamage = () => {
  const playerAttack =
    Math.floor(Math.random() * ATTACK_VALUE + 2) * (stage + 1) +
    (Math.random() < 0.03 + 0.01 * stage
      ? newMonsterHealth * (0.05 + stage * 0.01)
      : 0);
  damagePlayer.push(playerAttack);
  setTimeout(dealMonsterDamage, Math.random() * 5 * stage, playerAttack);
};

// handle button behavior
attackBtn.addEventListener("click", () => {
  if (playerHealthBar.value !== 0 && monsterHealthBar.value !== 0) {
    playerDamage();
    monsterDamage();
  } else {
    gameEnd();
  }
});

startBtn.addEventListener("click", () => {
  if (doesPlayerWin) nextStage();
  else sameStage();
});
