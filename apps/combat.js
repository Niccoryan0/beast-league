// This is going to contain the core gameplay loop for combat
/*
  >> Initialize loop: Get random monster and get player monster data
  >> Game loop: On ability input, do the following
    1. Roll turn order; 1-100 plus Speed
    2. Perform first acting battler's action
      a. Inflict effects, queue render animations
      b. Render animations in queue one at a time
      c. Update current health
      d. Render condition animation (if inflicted)
    3. Perform second acting battler's action
      a. Repeat from (2)
    4. Check battler health
      a. If battler slain, play death animation
      b. At end of death animation, spawn buttons for continue or return to home
*/

var userMonster, enemyMonster, userScore, startCombat, turnTimer = 0;

function initializeCombat() {
  enemyMonster = new MonsterBattler(getRandomMonster());
  enemyMonster.currentHealth = enemyMonster.maximumHealth;
  for (var i in enemyMonster.monsterData.abilitySet){
    enemyMonster.abilitySet.push( AbilityDatabase[enemyMonster.monsterData.abilitySet[i]] );
  }

  if (localStorage.getItem('userMonster')){
    userMonster = new MonsterBattler(JSON.parse(localStorage.getItem('userMonster')));
  } else {
    userMonster = new MonsterBattler(getRandomMonster());
    localStorage.setItem('userMonster', JSON.stringify(userMonster));
  }
  
  userMonster.currentHealth = userMonster.maximumHealth;
  for (var i in userMonster.monsterData.abilitySet){
    userMonster.abilitySet.push( AbilityDatabase[userMonster.monsterData.abilitySet[i]] );
  }
  console.log(userMonster);
  renderBattleSprites(userMonster.monsterData.imgSrc, enemyMonster.monsterData.imgSrc);
  enableAbilityTray();
};

function executeTurn(abilitySel) {
  disableAbilityTray();

  userMonster.nextAction = userMonster.abilitySet[abilitySel];
  enemyMonster.nextAction = enemyMonster.abilitySet[Math.round(Math.floor(Math.random() * enemyMonster.abilitySet.length))];

  var firstBattler, secondBattler;
  userMonster.initiativeRoll = rollInitiative(userMonster.monsterData);
  enemyMonster.initiativeRoll = rollInitiative(enemyMonster.monsterData);

  if (userMonster.initiativeRoll >= enemyMonster.initiativeRoll) {
    firstBattler = userMonster;
    secondBattler = enemyMonster;
  } else {
    firstBattler = enemyMonster;
    secondBattler = userMonster;
  }


  firstBattler.nextAction.execute(firstBattler, secondBattler);
  secondBattler.nextAction.execute(secondBattler, firstBattler);

  renderTurn();
}

function rollInitiative(monsterData) {
  return randomRoll = Math.floor(Math.random * 100) + monsterData.speed;
}

function userAttack(event){
  console.log('did something');
  if (event.keyCode === 97 || event.keyCode === 49) {
    executeTurn(0);
  }else if (event.keyCode === 98 || event.keyCode === 50) {
    executeTurn(1);
  }
}
