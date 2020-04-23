
// This is going to contain the core gameplay loop for combat
/*
  >> Initialize loop: Get random monster and get player monster data
  >> Game loop: On ability input, do the following
    1. Roll turn order; 1-100 plus Speed
    2. Perform first acting battler's action
      a. Inflict effects, queue render animations for each effect
      c. Update enemy values; if dead, can't act this turn and queues death animation
    3. Perform second acting battler's action
      a. Repeat from (2)
    4. Render animations
      a. In gameview.js, renders animations in the order that they are placed in the render queue
      b.  
*/

var userBattleContainer = document.getElementById('userBattleContainer');
var enemyBattleContainer = document.getElementById('enemyBattleContainer');
var userMonster, enemyMonster, userScore, startCombat, turnTimer = 0;

function initializeCombat() {
  if (document.getElementById('gameStartButton')) {
    var startButton = document.getElementById('gameStartButton');
    startButton.remove();
  }
  if (localStorage.getItem('userMonster')) {
    userMonster = new MonsterBattler(JSON.parse(localStorage.getItem('userMonster')));
  } else {
    userMonster = new MonsterBattler(getRandomMonster());
    localStorage.setItem('userMonster', JSON.stringify(userMonster));
  }



  // Instantiate enemy monster
  enemyMonster = new MonsterBattler(getRandomMonster());

  while (enemyMonster.monsterData.name === userMonster.monsterData.name) {
    enemyMonster = new MonsterBattler(getRandomMonster());
  }

  // Assigns effective stat values and abilities for both battlers
  enemyMonster.currentHealth = enemyMonster.maximumHealth;
  enemyMonster.currentAttack = enemyMonster.monsterData.attack;
  enemyMonster.currentDefense = enemyMonster.monsterData.defense;
  enemyMonster.currentSpeed = enemyMonster.monsterData.speed;
  for (var i in enemyMonster.monsterData.abilitySet) {
    enemyMonster.abilitySet.push(AbilityDatabase[enemyMonster.monsterData.abilitySet[i]]);
  }

  userMonster.currentHealth = userMonster.maximumHealth;
  userMonster.currentAttack = userMonster.monsterData.attack;
  userMonster.currentDefense = userMonster.monsterData.defense;
  userMonster.currentSpeed = userMonster.monsterData.speed;
  for (var i in userMonster.monsterData.abilitySet) {
    userMonster.abilitySet.push(AbilityDatabase[userMonster.monsterData.abilitySet[i]]);

  }

  // Sets battler targets
  enemyMonster.target = userMonster;
  userMonster.target = enemyMonster;

  var htmlBody = document.getElementById('body');
  var directions = document.createElement('h1');
  directions.textContent = 'Press a number on the keyboard to choose an attack';
  directions.className = 'directions';
  htmlBody.appendChild(directions);

  // Create health bars and battle positions at start
  renderHealthBars();
  renderMonsterStats();

  renderBattleSprites(userMonster.monsterData.imgSrc, enemyMonster.monsterData.imgSrc);
  enableAbilityTray();
};

function executeTurn(abilitySel) {
  // eslint-disable-next-line no-undef

  // 
  disableAbilityTray();

  // Sets monster's next action to take
  userMonster.nextAction = userMonster.abilitySet[abilitySel];
  enemyMonster.nextAction = enemyMonster.abilitySet[Math.round(Math.floor(Math.random() * enemyMonster.abilitySet.length))];

  // Each battler rolls initiative and their turn order is placed
  var firstBattler, secondBattler;
  userMonster.initiativeRoll = rollInitiative(userMonster.currentSpeed);
  enemyMonster.initiativeRoll = rollInitiative(enemyMonster.currentSpeed);

  if (userMonster.initiativeRoll >= enemyMonster.initiativeRoll) {
    firstBattler = userMonster;
    secondBattler = enemyMonster;
  } else {
    firstBattler = enemyMonster;
    secondBattler = userMonster;
  }

  // Each battler takes their turn; no turns are taken if either battler is defeated
  if (!firstBattler.isDefeated && !firstBattler.isStunned && !secondBattler.isDefeated) {
    firstBattler.applyPersistentEffects();
    firstBattler.nextAction.execute(firstBattler);
    firstBattler.tickConditions(firstBattler);
  }

  if (!firstBattler.isDefeated && !secondBattler.isDefeated && !secondBattler.isDefeated) {
    secondBattler.applyPersistentEffects();
    secondBattler.nextAction.execute(secondBattler);
    secondBattler.tickConditions(secondBattler);
  }

  // Calls animations in order currently in renderqueue
  renderTurn();
}

// Rolls initiative and passes back speed value
function rollInitiative(speedValue) {
  return randomRoll = Math.floor(Math.random * 100) + speedValue;
}

function userAttack(event) {
  if (event.keyCode === 97 || event.keyCode === 49) {
    executeTurn(0);
  } else if (event.keyCode === 98 || event.keyCode === 50) {
    executeTurn(1);
  }
  // Call dialoguebox and pass in turnTimer then increase it
  dialogueBox(turnTimer);
  turnTimer++;

  // Attempting to get the health bars to change dynamically when an attack happens
  updateHealthBars();
  updateMonsterStats();

}

// This function is to render the dialogue box to the screen each turn, it is called in the userAttack function
var dialogueBoxEl = document.getElementById('dialogueTrayDiv');
var dialogueUlEl = document.createElement('ul');
function dialogueBox(turnNumber) {
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