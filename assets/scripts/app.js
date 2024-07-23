const ATTACK_VALUE = 20;
let stage = 0;
let chosenMaxLife = 100;

adjustHealthBars(chosenMaxLife);

attackBtn.addEventListener("click", () => {
  let damageInput = Math.floor(Math.random() * ATTACK_VALUE + 2);
  if (playerHealthBar.value !== 0 && monsterHealthBar.value !== 0) {
    console.log(playerHealthBar.value);
    console.log(monsterHealthBar.value);
    dealMonsterDamage(damageInput);
    monsterDamage();
  } else {
    if (monsterHealthBar.value === 0) {
      alert(
        `You win!\nPlayer Health: ${playerHealthBar.value}\nMonster Health: ${monsterHealthBar.value}`
      );
    } else if (playerHealthBar.value === 0) {
      alert(
        `You win!\nPlayer Health: ${playerHealthBar.value}\nMonster Health: ${monsterHealthBar.value}`
      );
    }
  }
});

const monsterDamage = () => {
  const monsterAttack = Math.floor(Math.random() * stage + 10);
  console.log(typeof monsterAttack);
  setTimeout(dealPlayerDamage, 300 * (10 - stage), monsterAttack);
  stage++;
};
