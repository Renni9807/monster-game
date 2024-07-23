const ATTACK_VALUE = 20;
let chosenMaxLife = 100;

adjustHealthBars(chosenMaxLife);

attackBtn.addEventListener("click", () => {
  let damageInput = Math.floor(Math.random() * ATTACK_VALUE + 2);
  if (playerHealthBar.vaule !== 0 && monsterHealthBar.value !== 0) {
    dealMonsterDamage(damageInput);
    monsterDamage();
  } else {
    if (monsterHealthBar.value === 0) {
      alert("You win!");
    } else if (playerHealthBar === 0) {
      alert("You lose!");
    }
  }
});

const monsterDamage = () => {
  const stage = 0;
  const monsterAttack = Math.floor(Math.random() * stage + 10);
  console.log(typeof monsterAttack);
  setTimeout(dealPlayerDamage, 300 * (10 - stage), monsterAttack);
};
