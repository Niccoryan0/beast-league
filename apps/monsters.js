// THIS FILE NEEDS TO RUN FIRST
// This is for constructor functions for monsters, abilities, all stats and methods related to monsters

// TODO: Class for monsters, include stats
function MonsterData(name, description, imgSrc, attack, defense, speed, abilitySet){
  this.name = name;
  this.description = description;
  this.imgSrc = imgSrc;

  // Stat values are equal to 30 base
  this.attack = attack;
  this.speed = speed;
  this.defense = defense;
  this.abilitySet = abilitySet;
}

function MonsterBattler(monsterData) {
  this.monsterData = monsterData;
  this.initiativeRoll;
  this.currentHealth;
  this.maximumHealth = 80;
  this.currentAttack;
  this.currentDefense;
  this.currentSpeed;
  this.imgElement;
  this.nextAction;
  this.abilitySet = [];
  this.target;
  this.evasionRate = 0;
  this.globalDamageMultiplier = 1;
  this.globalAttackMultiplier = 1;
  this.currentStatusEffects = [];
};

MonsterBattler.prototype.takeDamage = function (damage, enemyAttackValue) {
  damage = Math.round(damage * (enemyAttackValue / this.monsterData.defense));
  this.currentHealth -= damage;
  if(this.currentHealth < 0 ){
    this.currentHealth = 0;
  }
  // user.name + ' deals ' + damage

  renderQueue.push(new RenderQueueEntry(this.imgElement, 'animShake'));
};

MonsterBattler.prototype.tickConditions = function(target) {
  if(this.currentStatusEffects.length > 0) {
    for(var i in this.currentStatusEffects) {
      this.currentStatusEffects[i] = this.currentStatusEffects[i].tickCondition(target);
      if(!this.currentStatusEffects[i]) this.currentStatusEffects.pop(i);
    }
  }

  console.log(this.currentStatusEffects);
};

MonsterBattler.prototype.addNewStatusEffect = function(newStatusEffect) {
  for(var i in this.currentStatusEffects) {
    if(this.currentStatusEffects[i].name === newStatusEffect.name) {
      if(this.currentStatusEffects[i].currDuration > newStatusEffect.currDuration) {
        this.currentStatusEffects[i].currDuration = newStatusEffect.currDuration;
      }

      return;
    }
  }

  newStatusEffect.applyEffect.effectMethod(this);
  this.currentStatusEffects.push(newStatusEffect);
};

function getRandomMonster(){
  var monKeyArray = Object.keys(monsterDatabase);
  var randNum = Math.floor(Math.random() * (monKeyArray.length));
  var randKey = monKeyArray[randNum];
  return monsterDatabase[randKey];
};

var krapkenDesc = 'A cross between a Japanese Kappa and a Kraken. This monstrous beast has the upper half of a human like turtle creature, the Kappa, with the Eldritch abomination that is it\'s Kraken lower half. Krapken enjoys hanging out in the water, with only his top half exposed, in order to lure in unsuspecting victims to pull them under with him tentacles.';
var mwpDesc = 'A horrifying creature, some say it\'s half wolf, half man, others say half wolf half pig. But in truth, it is some mix of all. With the razor sharp teeth and claws of a wolf, the hooves of a pig, and all the intelligence of a man, this is no creature to take lightly.';
var genrathDesc = 'A turtle may not be too terrifying a foe, certainly, but Genrath is no ordinary turtle. Towering above his enemies, Genrath the Great\'s one giant eye sees all, his giant shell offers subperb protection, and let\'s just say he really knows how to throw his weight around.';

var monsterDatabase = {
  mKrapken: new MonsterData('Krapken', krapkenDesc, 'assets/sprites/Krapken_160px_transparent.png', 30, 20, 40, ['Wrap', 'Lure']),
  mManWolfPig: new MonsterData('ManWolfPig', mwpDesc, 'assets/sprites/MWP_160px_transparent.png', 30, 30, 30, ['Lure', 'Trample'])
}

var dialogueBoxEl = document.getElementById('dialogueTrayDiv')
function dialogueBox(turnNumber, move){
  var headerEl = document.createElement('h3');
  var userParaEl = document.createElement('p');
  var enemyParaEl = document.createElement('p');
  headerEl.textContent = 'Turn Number: ' + turnNumber;
  dialogueBoxEl.appendChild(headerEl);
  userParaEl.textContent = userMonster.name + ' used ' + userMonster.nextAction;
  dialogueBoxEl.appendChild(userParaEl);
  enemyParaEl.textContent = enemyMonster.name + ' used ' + enemyMonster.nextAction;
  dialogueBoxEl.appendChild(enemyParaEl)
}