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

var gameWindowEl, userMonster, enemyMonster, userScore, startCombat, turnTimer = 0;

function initializeCombat() {
  //Get random monsterData, assign enemyMonster to new Battler with data
  //Get player monsterData, assign userMonster to new Battler with data
};

function executeTurn() {
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

  //execute firstBattler action -> adds to render queue
  //execute secondBattler action -> adds to render queue
  //check death -> adds to render queue

  //render function
}

function rollInitiative(monsterData) {
  return randomRoll = Math.floor(Math.random * 100) + monsterData.speed;
}