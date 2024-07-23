const ATTACK_VALUE = 20;
let stage = 0;
let chosenMaxLife = 100;

adjustHealthBars(chosenMaxLife);
let playerWin = true;
// reset monster and player health
const gameStart = () => {
  if (playerWin) {
    stage++;
  }
  let newMonsterHealth = chosenMaxLife * (1 + stage * 8 * Math.random());
  attackBtn.removeAttribute("disabled", "");
  strongAttackBtn.removeAttribute("disabled", "");
  healBtn.removeAttribute("disabled", "");
  logBtn.removeAttribute("disabled", "");
  startBtn.setAttribute("disabled", "");
  playerHealthBar.max = chosenMaxLife * (1 + stage * 0.5);
  playerHealthBar.value = chosenMaxLife * (1 + stage * 0.5);
  monsterHealthBar.max = newMonsterHealth;
  monsterHealthBar.value = newMonsterHealth;
};

const monsterDamage = () => {
  const monsterAttack = Math.floor(Math.random() * stage + 10);
  setTimeout(dealPlayerDamage, 400 * (10 - stage), monsterAttack, stage);
};

attackBtn.addEventListener("click", () => {
  let damageInput = Math.floor(Math.random() * ATTACK_VALUE + 2);
  if (playerHealthBar.value !== 0 && monsterHealthBar.value !== 0) {
    console.log(playerHealthBar.value);
    console.log(monsterHealthBar.value);
    dealMonsterDamage(damageInput, stage);
    monsterDamage();
  } else {
    if (monsterHealthBar.value === 0) {
      playerWin = true;
      alert(
        `Stage:${stage}\nYou win!\nPlayer Health: ${playerHealthBar.value}\nMonster Health: ${monsterHealthBar.value}`
      );
    } else if (playerHealthBar.value === 0) {
      playerWin = false;
      alert(
        `Stage: ${stage}\nYou lose..\nPlayer Health: ${playerHealthBar.value}\nMonster Health: ${monsterHealthBar.value}`
      );
    }
    startBtn.removeAttribute("disabled", "");
    attackBtn.setAttribute("disabled", "");
    strongAttackBtn.setAttribute("disabled", "");
    healBtn.setAttribute("disabled", "");
    logBtn.setAttribute("disabled", "");
  }
});

startBtn.addEventListener("click", () => {
  gameStart();
});
