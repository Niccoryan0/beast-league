
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
  if (localStorage.getItem('userMonster')){
    userMonster = new MonsterBattler(JSON.parse(localStorage.getItem('userMonster')));
  } else {
    userMonster = new MonsterBattler(getRandomMonster());
    localStorage.setItem('userMonster', JSON.stringify(userMonster));
  }


  enemyMonster = new MonsterBattler(getRandomMonster());
  while(enemyMonster.monsterData.name === userMonster.monsterData.name) {
    enemyMonster = new MonsterBattler(getRandomMonster());
  }
  enemyMonster.currentHealth = enemyMonster.maximumHealth;
  enemyMonster.currentAttack = enemyMonster.attack;
  enemyMonster.currentDefense = enemyMonster.defense;
  enemyMonster.currentSpeed = enemyMonster.speed;
  for (var i in enemyMonster.monsterData.abilitySet){
    enemyMonster.abilitySet.push( AbilityDatabase[enemyMonster.monsterData.abilitySet[i]] );
  }


  userMonster.currentHealth = userMonster.maximumHealth;
  for (var i in userMonster.monsterData.abilitySet){
    userMonster.abilitySet.push( AbilityDatabase[userMonster.monsterData.abilitySet[i]] );
  }

  console.log(userMonster);
  enemyMonster.target = userMonster;
  userMonster.target = enemyMonster;

  renderBattleSprites(userMonster.monsterData.imgSrc, enemyMonster.monsterData.imgSrc);
  enableAbilityTray();
};

function executeTurn(abilitySel) {
  // eslint-disable-next-line no-undef
  disableAbilityTray();
  // turnCounter ++
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


  firstBattler.nextAction.execute(firstBattler);
  secondBattler.nextAction.execute(secondBattler);

  // Two options for stat modifiers:
  // 1. Add a self-effect that's called in another effect, and passes in the user as the target
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
  // Call dialoguebox and pass in turnTimer then increase it
  dialogueBox(turnTimer);
  turnTimer++;

  // Attempting to get the health bars to change dynamically when an attack happens
  var userHealthBar = document.getElementById('userHealth');
  userHealthBar.style.width = userMonster.currentHealth / userMonster.maximumHealth;
  var enemyHealthBar = document.getElementById('enemyHealth');
  enemyHealthBar.style.width = enemyMonster.currentHealth / enemyMonster.maximumHealth;

}

// This function is to render the dialogue box to the screen each turn, it is called in the userAttack function
var dialogueBoxEl = document.getElementById('dialogueTrayDiv');
var dialogueUlEl = document.createElement('ul');
function dialogueBox(turnNumber){
  dialogueBoxEl.appendChild(dialogueUlEl);
  // This is all placed in one list item so that we can control where in the list it is placed with the insertBefore method at the end of this function
  var dialogueLiEl = document.createElement('li');
  var headerEl = document.createElement('h3');
  var userParaEl = document.createElement('p');
  var enemyParaEl = document.createElement('p');

  headerEl.textContent = 'Turn Number: ' + turnNumber;
  userParaEl.textContent = userMonster.monsterData.name + ' (player) used ' + userMonster.nextAction.name;
  enemyParaEl.textContent = enemyMonster.monsterData.name + ' (enemy) used ' + enemyMonster.nextAction.name;

  dialogueLiEl.appendChild(headerEl);
  dialogueLiEl.appendChild(userParaEl);
  dialogueLiEl.appendChild(enemyParaEl);
  // Place the new item at the top of the list, this came from W3 schools on the insertBefore method
  dialogueUlEl.insertBefore(dialogueLiEl, dialogueUlEl.childNodes[0]);
}